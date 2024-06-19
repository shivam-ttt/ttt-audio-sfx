export default async function applyFadeEffect(
    audioElement,
    src,
    fadeInDuration = 0,
    fadeOutDuration = 0
) {
    if (!audioElement || !src) {
        throw new Error("Missing required parameters");
    }

    const audioContext = new AudioContext();

    try {
        // Fetch the audio data
        const response = await fetch(src);
        if (!response.ok) {
            throw new Error("Failed to fetch audio data");
        }
        const arrayBuffer = await response.arrayBuffer();

        // Decode the audio data
        const decodedAudio = await audioContext.decodeAudioData(arrayBuffer);

        // Create the audio source
        const audioSource = audioContext.createBufferSource();
        audioSource.buffer = decodedAudio;

        // Create a gain node for volume control
        const gainNode = audioContext.createGain();
        gainNode.gain.value = 0; // Start at 0 volume for fade-in

        // Connect nodes
        audioSource.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Apply fade-in
        if (fadeInDuration > 0) {
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(
                1,
                audioContext.currentTime + fadeInDuration
            );
        } else {
            gainNode.gain.value = 1; // Set to full volume if no fade-in
        }

        // Schedule fade-out
        if (fadeOutDuration > 0) {
            const fadeOutStartTime = decodedAudio.duration - fadeOutDuration;
            gainNode.gain.setValueAtTime(
                1,
                audioContext.currentTime + fadeOutStartTime
            );
            gainNode.gain.linearRampToValueAtTime(
                0,
                audioContext.currentTime + decodedAudio.duration
            );
        }

        // Start the audio
        audioSource.start();

        // Handle the audio element's srcObject
        const mediaStreamDestination =
            audioContext.createMediaStreamDestination();
        gainNode.connect(mediaStreamDestination);
        audioElement.srcObject = mediaStreamDestination.stream;

        // Cleanup on end
        audioSource.onended = () => {
            audioElement.srcObject = null; // Disconnect the audio element
            audioContext.close(); // Close the audio context
        };
    } catch (error) {
        console.error("Error applying fade effect:", error);
        audioContext.close(); // Ensure audio context is closed on error
    }
}
