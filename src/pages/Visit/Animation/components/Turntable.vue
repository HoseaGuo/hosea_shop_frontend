<script lang="tsx">

enum lotteryStatus {
  stop = 0,
  speedUp = 1,
  speedUpAndStop = 2, // 加速过程中触发了停止
  sppedUniform = 3,
  speedDown = 4
}

type Options = {
  /* 旋转类型， pointer：指针旋转 default；disk：礼物转盘旋转， */
  type?: "pointer" | "disk";
  /* 指针偏移角度 */
  offset?: number,
  /* 奖品池中奖品数量 */
  prizesNumber?: number,
  /* 抽奖结束的回调事件 */
  onStop?: (index) => void
}

class TurntableLottery {
  type = "pointer"; // 类型 指针转动 或者 转盘转动

  angle = 0; // 当前所在角度

  offset = 0; // 指针偏移角度，为了在指针/转盘旋转后可以让指针正对奖品中间。

  rotateElement; // 旋转的dom元素

  speed = 14; // 旋转速度 10deg 每一次屏幕刷新

  rafId; // 记录requestAnimationFrame事件id

  status = lotteryStatus.stop; // 转盘抽奖当前所在的状态

  prizesNumber = 0; // 奖品池中奖品数量

  resultPrizesIndex = 0; // 最终结果index

  // 抽奖转盘旋转结束时候触发的回调事件
  onStop(index) { }

  constructor(element, options: Options) {
    this.rotateElement = element;

    this.type = options.type || this.type;

    this.offset = options.offset || this.offset;

    this.prizesNumber = options.prizesNumber || this.prizesNumber;

    this.onStop = options.onStop || this.onStop;

    // this.angle = this.offset;

    this.rotateElement.style.transform = `rotate(${this.angle}deg)`;

    this.bindEvent();
  }

  start() {
    if (this.status !== lotteryStatus.stop) return;

    const { rotateElement } = this;

    // 启动加速旋转效用，使用css
    this.angle += 360 * 2;
    rotateElement.style.transition = "1.5s ease-in";
    rotateElement.style.transform = `rotate(${this.angle}deg)`;
    this.status = lotteryStatus.speedUp;
  }

  /**
   * 
   * @param index 传入奖品结果的index
   */
  stop(index = 0) {
    if ([lotteryStatus.stop, lotteryStatus.speedUpAndStop, lotteryStatus.speedDown].includes(this.status)) return;
    // 起速阶段，调用停止
    if (this.status === lotteryStatus.speedUp) {
      this.resultPrizesIndex = Math.max(0, index % this.prizesNumber);
      this.status = lotteryStatus.speedUpAndStop;
      return;
    }

    cancelAnimationFrame(this.rafId);

    let currentAngle = this.angle;

    this.resultPrizesIndex = Math.max(0, index % this.prizesNumber);

    // 旋转圈数
    let currentRotateNumber = Math.ceil(this.angle / 360);

    const { rotateElement } = this;

    // 计算得到最终停止的角度，指针会停止在对应的奖品
    let targetAngle = currentRotateNumber * 360 + ((this.type === "pointer" ? index : (this.prizesNumber - 1 - index)) * 360 / this.prizesNumber) + 360 * 2 + this.offset;

    this.status = lotteryStatus.speedDown;

    // 利用css来停止转动的时间，单位：ms
    let durationTime = (targetAngle - currentAngle) / (360 * 2) * 1500;

    this.angle = targetAngle;

    // 利用css来减速停止转盘转动
    rotateElement.style.transition = `${durationTime}ms ease-out`;

    rotateElement.style.transform = `rotate(${this.angle}deg)`;
  }

  // 匀速旋转
  uniformSpeedRotate() {
    this.rafId = requestAnimationFrame(() => {
      this.angle += this.speed;
      this.rotateElement.style.transform = `rotate(${this.angle}deg)`;
      this.uniformSpeedRotate();
    })
  }

  bindEvent() {
    const { rotateElement } = this;
    rotateElement.addEventListener('transitionend', () => {
      if (this.status === lotteryStatus.speedUp) {
        this.status = lotteryStatus.sppedUniform;
        rotateElement.style.transition = "none";
        // 开始匀速转动
        this.uniformSpeedRotate();
      } else if (this.status === lotteryStatus.speedDown) {
        console.log("转盘旋转停止")
        this.status = lotteryStatus.stop;
        // 调用停止事件
        this.onStop(this.resultPrizesIndex);
      } else if (this.status === lotteryStatus.speedUpAndStop) { // 在speedUp的时候，用户点击停止就会触发的。
        this.status = lotteryStatus.sppedUniform;
        this.stop(this.resultPrizesIndex);
      }
    }, false)
  }

  destory() {
    this.status = lotteryStatus.stop;
    cancelAnimationFrame(this.rafId);
    this.rotateElement.style.transition = "none";
    this.rotateElement.style.transform = "none";
  }

}

export default defineComponent({
  setup() {
    const bgRef = ref<any>(null);
    const pointerRef = ref<any>(null);

    // 转盘类型
    let lotteryType = ref<"pointer" | "disk">("disk");

    let turntableLottery: TurntableLottery;

    let prizesList = ["未中奖", "提高白条额度", "免分期服务费", "免单5单", "免单10元", "免单50元", "免单4999元"];

    onMounted(() => {

      watch(lotteryType, (newValue) => {
        if (turntableLottery) turntableLottery.destory();
        let element = newValue === 'disk' ? bgRef.value : pointerRef.value;
        turntableLottery = new TurntableLottery(element, {
          type: newValue,
          offset: 25.7,
          prizesNumber: 7,
          onStop: (index) => {
            alert(`抽奖结果：${prizesList[index]}`)
          }
        });

      }, { immediate: true })
    })



    function lotteryStart() {
      turntableLottery?.start();
    }

    function lotteryStop() {
      let index = Math.floor(Math.random() * 7);
      turntableLottery.stop(index);
    }

    return () => (
      <div>
        <div class="top">
          <el-button onClick={lotteryStart} size="small" >开始</el-button>
          <el-button onClick={lotteryStop} size="small" style="margin-right: 20px">停止</el-button>
          <el-switch v-model={lotteryType.value} active-text="指针转动" inactive-text="转盘转动" active-value="pointer" inactive-value="disk" />
        </div>
        <div class="turntable">
          <div class="turntable-bg" ref={bgRef}></div>
          <div class="pointer" ref={pointerRef}></div>
        </div>
      </div>
    )
  }
})
</script>

<style lang="scss" scoped>
.turntable {
  position: relative;
  width: 500px;
  border-radius: 50%;
  overflow: hidden;
  .turntable-bg {
    position: relative;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    // background-color: #f5625c;
    // overflow: hidden;
    background: center/cover url("@assets/turntable-bg.png");
  }
  .pointer {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 160px;
    height: 160px;
    margin: -80px 0 0 -80px;
    background-color: #ff6c24;
    border-radius: 50%;
    // transition: 2s ease;
    &:before {
      content: "";
      position: absolute;
      left: 50%;
      top: -48px;
      margin-left: -20px;
      border: 20px solid transparent;
      border-top-width: 0;
      border-bottom: 50px solid #b70505;
    }
    &:after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      border-radius: 50%;
      width: 100%;
      height: 100%;
      border: 12px solid #ffd135;
      box-sizing: border-box;
    }
  }
}
.top {
  text-align: center;
  margin-bottom: 40px;
}
.bottom {
  margin-top: 50px;
  text-align: center;
}
</style>