import { styled, css, setup } from 'goober';
import { createApp, h, defineCustomElement, createRenderer, ref, toRef } from 'vue'
setup(h)


export default {
  setup() {





    return () => {
      return <div>
        123
        <Container >
          <template>123</template>
        </Container >
      </div>
    }
  }
}

const Container = styled('div')((props) => ({
  color: "red"
}));

