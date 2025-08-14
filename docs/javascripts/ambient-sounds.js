/**
 * AMBIENT SOUNDS - Nature Soundscapes for Meditation
 */

class AmbientSoundManager {
    constructor() {
        this.audioContext = null;
        this.currentAmbient = null;
        this.volume = 0.3;
        this.isPlaying = false;
        this.fadeDuration = 2000; // 2 seconds

        this.soundscapes = {
            rain: {
                name: 'Gentle Rain',
                icon: '🌧️',
                description: 'Soft rainfall for deep relaxation',
                generator: () => this.generateRain()
            },
            forest: {
                name: 'Forest Ambience',
                icon: '🌲',
                description: 'Peaceful forest with bird songs',
                generator: () => this.generateForest()
            },
            ocean: {
                name: 'Ocean Waves',
                icon: '🌊',
                description: 'Rhythmic waves on a quiet beach',
                generator: () => this.generateOcean()
            },
            wind: {
                name: 'Mountain Wind',
                icon: '💨',
                description: 'Gentle wind through mountains',
                generator: () => this.generateWind()
            },
            bowls: {
                name: 'Tibetan Bowls',
                icon: '🎵',
                description: 'Resonant singing bowls',
                generator: () => this.generateBowls()
            },
            silence: {
                name: 'Pure Silence',
                icon: '🤫',
                description: 'Complete quiet for inner focus',
                generator: () => this.generateSilence()
            }
        };

        this.init();
    }

    async init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.audioContext.createGain();
            this.masterGain.connect(this.audioContext.destination);
            this.masterGain.gain.value = this.volume;

            this.renderSoundControls();
            this.bindEvents();

            console.log('🎵 Ambient Sound Manager initialized');
        } catch (error) {
            console.log('Web Audio not supported:', error);
        }
    }

    renderSoundControls() {
        const soundControlContainers = document.querySelectorAll('.ambient-sound-controls');

        soundControlContainers.forEach(container => {
            container.innerHTML = `
                <div class="ambient-panel">
                    <h4>🎵 Ambient Sounds</h4>
                    <div class="soundscape-grid">
                        ${Object.entries(this.soundscapes).map(([key, soundscape]) => `
                            <button class="soundscape-btn" data-soundscape="${key}">
                                <div class="soundscape-icon">${soundscape.icon}</div>
                                <div class="soundscape-name">${soundscape.name}</div>
                            </button>
                        `).join('')}
                    </div>
                    <div class="volume-control">
                        <label>Volume: <span class="volume-display">${Math.round(this.volume * 100)}%</span></label>
                        <input type="range" class="ambient-volume" min="0" max="100" value="${this.volume * 100}">
                    </div>
                    <div class="ambient-status">
                        <div class="status-indicator">
                            <span class="status-text">Ready</span>
                            <div class="audio-visualizer">
                                <div class="viz-bar"></div>
                                <div class="viz-bar"></div>
                                <div class="viz-bar"></div>
                                <div class="viz-bar"></div>
                                <div class="viz-bar"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.soundscape-btn') || e.target.parentElement.matches('.soundscape-btn')) {
                const btn = e.target.matches('.soundscape-btn') ? e.target : e.target.parentElement;
                const soundscape = btn.dataset.soundscape;
                this.toggleSoundscape(soundscape);
                this.updateButtonStates(btn);
            }
        });

        document.addEventListener('input', (e) => {
            if (e.target.matches('.ambient-volume')) {
                this.setVolume(e.target.value / 100);
                this.updateVolumeDisplay(e.target.value);
            }
        });

        // Auto-stop ambient sounds when meditation timer completes
        document.addEventListener('meditation-complete', () => {
            this.fadeOut();
        });
    }

    toggleSoundscape(type) {
        if (this.currentAmbient === type && this.isPlaying) {
            this.stop();
        } else {
            this.play(type);
        }
    }

    async play(type) {
        if (!this.audioContext) return;

        // Resume audio context if suspended
        if (this.audioContext.state === 'suspended') {
            await this.audioContext.resume();
        }

        // Stop current ambient if playing
        if (this.isPlaying) {
            this.stop();
        }

        this.currentAmbient = type;
        this.isPlaying = true;

        // Generate the soundscape
        const soundscape = this.soundscapes[type];
        if (soundscape && soundscape.generator) {
            this.currentNodes = soundscape.generator();
            this.fadeIn();
            this.updateStatus(`Playing: ${soundscape.name}`);
            this.startVisualizer();
        }
    }

    stop() {
        if (!this.isPlaying) return;

        this.fadeOut(() => {
            if (this.currentNodes) {
                this.currentNodes.forEach(node => {
                    if (node.stop) {
                        try { node.stop(); } catch (e) { }
                    }
                    if (node.disconnect) {
                        try { node.disconnect(); } catch (e) { }
                    }
                });
                this.currentNodes = null;
            }

            this.isPlaying = false;
            this.currentAmbient = null;
            this.updateStatus('Ready');
            this.stopVisualizer();
        });
    }

    generateRain() {
        const nodes = [];

        // Pink noise for rain texture
        const bufferSize = 4096;
        const rainNoise = this.audioContext.createScriptProcessor(bufferSize, 0, 2);
        const rainGain = this.audioContext.createGain();
        const rainFilter = this.audioContext.createBiquadFilter();

        let b0L = 0, b1L = 0, b2L = 0, b3L = 0, b4L = 0, b5L = 0, b6L = 0;
        let b0R = 0, b1R = 0, b2R = 0, b3R = 0, b4R = 0, b5R = 0, b6R = 0;

        rainNoise.onaudioprocess = (e) => {
            const outputL = e.outputBuffer.getChannelData(0);
            const outputR = e.outputBuffer.getChannelData(1);

            for (let i = 0; i < bufferSize; i++) {
                const whiteL = Math.random() * 2 - 1;
                const whiteR = Math.random() * 2 - 1;

                // Pink noise filter (left channel)
                b0L = 0.99886 * b0L + whiteL * 0.0555179;
                b1L = 0.99332 * b1L + whiteL * 0.0750759;
                b2L = 0.96900 * b2L + whiteL * 0.1538520;
                b3L = 0.86650 * b3L + whiteL * 0.3104856;
                b4L = 0.55000 * b4L + whiteL * 0.5329522;
                b5L = -0.7616 * b5L - whiteL * 0.0168980;
                outputL[i] = (b0L + b1L + b2L + b3L + b4L + b5L + b6L + whiteL * 0.5362) * 0.15;
                b6L = whiteL * 0.115926;

                // Pink noise filter (right channel)
                b0R = 0.99886 * b0R + whiteR * 0.0555179;
                b1R = 0.99332 * b1R + whiteR * 0.0750759;
                b2R = 0.96900 * b2R + whiteR * 0.1538520;
                b3R = 0.86650 * b3R + whiteR * 0.3104856;
                b4R = 0.55000 * b4R + whiteR * 0.5329522;
                b5R = -0.7616 * b5R - whiteR * 0.0168980;
                outputR[i] = (b0R + b1R + b2R + b3R + b4R + b5R + b6R + whiteR * 0.5362) * 0.15;
                b6R = whiteR * 0.115926;
            }
        };

        rainFilter.type = 'lowpass';
        rainFilter.frequency.value = 2000;
        rainFilter.Q.value = 0.5;

        rainNoise.connect(rainFilter);
        rainFilter.connect(rainGain);
        rainGain.connect(this.masterGain);

        nodes.push(rainNoise, rainGain, rainFilter);

        // Occasional thunder (very subtle)
        const createThunder = () => {
            if (!this.isPlaying || this.currentAmbient !== 'rain') return;

            setTimeout(() => {
                if (Math.random() < 0.3) { // 30% chance
                    this.createSubtleThunder();
                }
                createThunder();
            }, 30000 + Math.random() * 60000); // 30-90 seconds
        };

        createThunder();

        return nodes;
    }

    generateForest() {
        const nodes = [];

        // Wind through leaves
        const windOsc = this.audioContext.createOscillator();
        const windGain = this.audioContext.createGain();
        const windFilter = this.audioContext.createBiquadFilter();
        const windLFO = this.audioContext.createOscillator();
        const windLFOGain = this.audioContext.createGain();

        windOsc.type = 'sawtooth';
        windOsc.frequency.value = 60;

        windLFO.type = 'sine';
        windLFO.frequency.value = 0.1;
        windLFOGain.gain.value = 20;

        windLFO.connect(windLFOGain);
        windLFOGain.connect(windOsc.frequency);

        windFilter.type = 'lowpass';
        windFilter.frequency.value = 300;
        windGain.gain.value = 0.1;

        windOsc.connect(windFilter);
        windFilter.connect(windGain);
        windGain.connect(this.masterGain);

        windOsc.start();
        windLFO.start();

        nodes.push(windOsc, windGain, windFilter, windLFO, windLFOGain);

        // Bird calls
        const createBirdCall = () => {
            if (!this.isPlaying || this.currentAmbient !== 'forest') return;

            setTimeout(() => {
                this.createBirdSound();
                createBirdCall();
            }, 3000 + Math.random() * 15000);
        };

        createBirdCall();

        return nodes;
    }

    generateOcean() {
        const nodes = [];

        // Wave noise
        const waveNoise = this.audioContext.createScriptProcessor(4096, 0, 2);
        const waveGain = this.audioContext.createGain();
        const waveFilter = this.audioContext.createBiquadFilter();
        const waveLFO = this.audioContext.createOscillator();
        const waveLFOGain = this.audioContext.createGain();

        waveNoise.onaudioprocess = (e) => {
            const outputL = e.outputBuffer.getChannelData(0);
            const outputR = e.outputBuffer.getChannelData(1);

            for (let i = 0; i < 4096; i++) {
                const noise = (Math.random() * 2 - 1) * 0.1;
                outputL[i] = noise;
                outputR[i] = noise * 0.8; // Slight stereo difference
            }
        };

        // LFO for wave motion
        waveLFO.type = 'sine';
        waveLFO.frequency.value = 0.05; // Very slow waves
        waveLFOGain.gain.value = 300;

        waveLFO.connect(waveLFOGain);
        waveLFOGain.connect(waveFilter.frequency);

        waveFilter.type = 'lowpass';
        waveFilter.frequency.value = 800;
        waveGain.gain.value = 0.3;

        waveNoise.connect(waveFilter);
        waveFilter.connect(waveGain);
        waveGain.connect(this.masterGain);

        waveLFO.start();

        nodes.push(waveNoise, waveGain, waveFilter, waveLFO, waveLFOGain);

        return nodes;
    }

    generateWind() {
        const nodes = [];

        // Multiple wind layers for richness
        for (let i = 0; i < 3; i++) {
            const windOsc = this.audioContext.createOscillator();
            const windGain = this.audioContext.createGain();
            const windFilter = this.audioContext.createBiquadFilter();
            const windLFO = this.audioContext.createOscillator();
            const windLFOGain = this.audioContext.createGain();

            windOsc.type = 'sawtooth';
            windOsc.frequency.value = 40 + i * 20;

            windLFO.type = 'sine';
            windLFO.frequency.value = 0.05 + i * 0.02;
            windLFOGain.gain.value = 15;

            windLFO.connect(windLFOGain);
            windLFOGain.connect(windGain.gain);

            windFilter.type = 'lowpass';
            windFilter.frequency.value = 200 + i * 100;
            windGain.gain.value = 0.05;

            windOsc.connect(windFilter);
            windFilter.connect(windGain);
            windGain.connect(this.masterGain);

            windOsc.start();
            windLFO.start();

            nodes.push(windOsc, windGain, windFilter, windLFO, windLFOGain);
        }

        return nodes;
    }

    generateBowls() {
        const nodes = [];

        // Periodic singing bowls
        const createBowlSound = () => {
            if (!this.isPlaying || this.currentAmbient !== 'bowls') return;

            const frequencies = [174, 285, 396, 417, 528, 639, 741, 852]; // Solfeggio frequencies
            const freq = frequencies[Math.floor(Math.random() * frequencies.length)];

            this.createBowlTone(freq, 8 + Math.random() * 4);

            setTimeout(createBowlSound, 10000 + Math.random() * 20000);
        };

        createBowlSound();

        return nodes;
    }

    generateSilence() {
        // Pure silence - just return empty array
        return [];
    }

    createBowlTone(frequency, duration) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.95, this.audioContext.currentTime + duration);

        filter.type = 'lowpass';
        filter.frequency.value = frequency * 4;
        filter.Q.value = 2;

        const now = this.audioContext.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.rapidRampToValueAtTime(0.1, now + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.masterGain);

        oscillator.start(now);
        oscillator.stop(now + duration);
    }

    createBirdSound() {
        const freq = 800 + Math.random() * 1200;
        const duration = 0.3 + Math.random() * 0.5;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(freq * 1.5, this.audioContext.currentTime + duration * 0.3);
        oscillator.frequency.exponentialRampToValueAtTime(freq * 0.8, this.audioContext.currentTime + duration);

        const now = this.audioContext.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.rapidRampToValueAtTime(0.05, now + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);

        oscillator.start(now);
        oscillator.stop(now + duration);
    }

    createSubtleThunder() {
        const noise = this.audioContext.createScriptProcessor(4096, 0, 1);
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        noise.onaudioprocess = (e) => {
            const output = e.outputBuffer.getChannelData(0);
            for (let i = 0; i < 4096; i++) {
                output[i] = (Math.random() * 2 - 1) * 0.05;
            }
        };

        filter.type = 'lowpass';
        filter.frequency.value = 100;

        const now = this.audioContext.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.rapidRampToValueAtTime(0.1, now + 0.5);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 4);

        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.masterGain);

        setTimeout(() => {
            try {
                noise.disconnect();
            } catch (e) { }
        }, 4000);
    }

    fadeIn() {
        if (this.masterGain) {
            this.masterGain.gain.setValueAtTime(0, this.audioContext.currentTime);
            this.masterGain.gain.linearRampToValueAtTime(this.volume, this.audioContext.currentTime + this.fadeDuration / 1000);
        }
    }

    fadeOut(callback) {
        if (this.masterGain) {
            this.masterGain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + this.fadeDuration / 1000);
            setTimeout(() => {
                if (callback) callback();
            }, this.fadeDuration);
        } else if (callback) {
            callback();
        }
    }

    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        if (this.masterGain && this.isPlaying) {
            this.masterGain.gain.linearRampToValueAtTime(this.volume, this.audioContext.currentTime + 0.1);
        }
    }

    updateButtonStates(activeBtn) {
        document.querySelectorAll('.soundscape-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        if (this.isPlaying) {
            activeBtn.classList.add('active');
        }
    }

    updateVolumeDisplay(value) {
        document.querySelectorAll('.volume-display').forEach(display => {
            display.textContent = `${Math.round(value)}%`;
        });
    }

    updateStatus(status) {
        document.querySelectorAll('.status-text').forEach(text => {
            text.textContent = status;
        });
    }

    startVisualizer() {
        const visualizers = document.querySelectorAll('.audio-visualizer');
        visualizers.forEach(viz => {
            viz.classList.add('active');
        });
    }

    stopVisualizer() {
        const visualizers = document.querySelectorAll('.audio-visualizer');
        visualizers.forEach(viz => {
            viz.classList.remove('active');
        });
    }

    // Public API
    getCurrentAmbient() {
        return this.currentAmbient;
    }

    isCurrentlyPlaying() {
        return this.isPlaying;
    }
}

// Add ambient sound styles
const ambientStyles = `
<style>
.ambient-panel {
    background: linear-gradient(145deg, #f8f9fa, #e9ecef);
    border-radius: 20px;
    padding: 25px;
    margin: 20px 0;
}

.soundscape-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 15px;
    margin: 20px 0;
}

.soundscape-btn {
    background: linear-gradient(145deg, #ffffff, #f0f0f0);
    border: 2px solid transparent;
    border-radius: 15px;
    padding: 15px 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
}

.soundscape-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.soundscape-btn.active {
    background: linear-gradient(145deg, var(--zen-accent), var(--zen-gold));
    color: white;
    border-color: var(--zen-accent);
    animation: ambient-glow 2s infinite alternate;
}

@keyframes ambient-glow {
    0% { box-shadow: 0 0 10px rgba(255, 193, 7, 0.3); }
    100% { box-shadow: 0 0 20px rgba(255, 193, 7, 0.6); }
}

.soundscape-icon {
    font-size: 1.5em;
    margin-bottom: 5px;
}

.soundscape-name {
    font-size: 0.8em;
    font-weight: 500;
}

.volume-control {
    margin: 20px 0;
    text-align: center;
}

.ambient-volume {
    width: 100%;
    margin-top: 10px;
}

.ambient-status {
    text-align: center;
    margin-top: 20px;
}

.audio-visualizer {
    display: flex;
    justify-content: center;
    align-items: end;
    height: 30px;
    gap: 3px;
    margin-top: 10px;
}

.viz-bar {
    width: 4px;
    height: 5px;
    background: var(--zen-accent);
    border-radius: 2px;
    transition: height 0.3s ease;
}

.audio-visualizer.active .viz-bar {
    animation: viz-dance 1.5s infinite ease-in-out;
}

.audio-visualizer.active .viz-bar:nth-child(1) { animation-delay: 0s; }
.audio-visualizer.active .viz-bar:nth-child(2) { animation-delay: 0.1s; }
.audio-visualizer.active .viz-bar:nth-child(3) { animation-delay: 0.2s; }
.audio-visualizer.active .viz-bar:nth-child(4) { animation-delay: 0.3s; }
.audio-visualizer.active .viz-bar:nth-child(5) { animation-delay: 0.4s; }

@keyframes viz-dance {
    0%, 100% { height: 5px; }
    50% { height: 25px; }
}

[data-md-color-scheme="slate"] .ambient-panel {
    background: linear-gradient(145deg, #3b4252, #434c5e);
}

[data-md-color-scheme="slate"] .soundscape-btn {
    background: linear-gradient(145deg, #434c5e, #4c566a);
    color: #eceff4;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', ambientStyles);

// Initialize ambient sound manager
document.addEventListener('DOMContentLoaded', () => {
    window.ambientSounds = new AmbientSoundManager();
});

export default AmbientSoundManager;
