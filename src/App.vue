<script lang="tsx">
export default {
  setup() {
    return () => (
      <router-view>
        {({ Component }) => {
          return <Component />;
        }}
      </router-view>
    );
  },
};
</script>