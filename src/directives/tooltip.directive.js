export default {
  mounted (el, binding) {
    // eslint-disable-next-line
    M.Tooltip.init(el, {html: binding.value})
  },
  unmounted (el) {
    // eslint-disable-next-line
    const tooltip = M.Tooltip.getInstance(el)

    if (tooltip && tooltip.destroy) {
      tooltip.destroy()
    }
  }
}
