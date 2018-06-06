<template>
    <div id="waveform"></div>
</template>
<script src="//cdnjs.cloudflare.com/ajax/libs/wavesurfer.js/2.0.5/wavesurfer.min.js"></script>
<script>
    var wavesurfer = Object.create(WaveSurfer); 
    wavesurfer.init({
        container: '#waveform',
        waveColor: 'violet',
        progressColor: 'purple'
    })
    wavesurfer.load('audio.wav')
</script>
