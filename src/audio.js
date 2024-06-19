export default async function applyFadeEffect(
    audioElement,
    src,
    fadeInDuration = 0,
    fadeOutDuration = 0,
    maxVolume = 1
) {
    if (!audioElement || !src) {
        throw new Error("Missing required parameters");
    }

    audioElement.volume = 0;
    audioElement.src = src;
    audioElement.load();

    audioElement.addEventListener("play", () => {
        if (fadeInDuration > 0) {
            let currentVolume = 0;
            const fadeInInterval = 50;
            const fadeInStep = fadeInInterval / (fadeInDuration * 1000);

            const fadeInTimer = setInterval(() => {
                currentVolume += fadeInStep;
                if (currentVolume >= maxVolume) {
                    currentVolume = maxVolume;
                    clearInterval(fadeInTimer);
                }
                audioElement.volume = currentVolume;
            }, fadeInInterval);
        } else {
            audioElement.volume = maxVolume;
        }

        if (fadeOutDuration > 0) {
            const fadeOutStartTime = audioElement.duration - fadeOutDuration;

            setTimeout(() => {
                let currentVolume = maxVolume;
                const fadeOutInterval = 50;
                const fadeOutStep = fadeOutInterval / (fadeOutDuration * 1000);

                const fadeOutTimer = setInterval(() => {
                    currentVolume -= fadeOutStep;
                    if (currentVolume <= 0) {
                        currentVolume = 0;
                        clearInterval(fadeOutTimer);
                        audioElement.pause();
                    }
                    audioElement.volume = currentVolume;
                }, fadeOutInterval);
            }, fadeOutStartTime * 1000);
        }
    });
}
