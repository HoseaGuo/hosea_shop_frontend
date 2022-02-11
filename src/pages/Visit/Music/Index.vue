
<script lang="tsx">
import audioSrc from "./assets/Charlotte Lawrence - Slow Motion (Johan Lenox Version).mp3";
export default defineComponent({
  setup() {
    const music = ref<any>(null);

    let gainNode: any;


    let musicGainValue = ref(100);

    onMounted(() => {
      createMusic();
    })

    async function createMusic() {

      let musicAudioElement = music.value;

      musicAudioElement.src = audioSrc;

      /* musicAudioElement.onloadedmetadata = function () {
        
      } */

      // const audioContext = new AudioContext();

    }

    function userClick() {
      const audioContext = new AudioContext();

      const source = audioContext.createMediaElementSource(music.value);

      gainNode = audioContext.createGain();

      source.connect(gainNode);

      gainNode.connect(audioContext.destination);

      gainNode.gain.value = musicGainValue.value / 100;
    }

    function musicPlay() {
      music.value.play();
    }

    function musicPause() {
      music.value.pause();
    }

    function rangeChange(e) {
      // console.log(e.target.value)
      if (gainNode) gainNode.gain.value = e.target.value / 100;
    }

    return () => (
      <>
        <p>音量：{musicGainValue.value}</p>
        <div>
          <el-button onClick={userClick}>点击初始化音频</el-button>
          <audio ref={music}></audio>
        </div>
        <input type="range" min="0" max="100" v-model={musicGainValue.value} onChange={rangeChange} />
        <div>
          <el-button onClick={musicPlay}>开始</el-button>
          <el-button onClick={musicPause}>暂停</el-button>
        </div>
      </>
    )
  }
})
</script>