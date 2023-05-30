import currency from '@/utils/currencyFormatter'

export default (categories, records, transformCategories, localize) => {
  if (categories.value) {
    transformCategories.value = categories.value.map(cat => {
      let spend = 0

      if (records.value) {
        spend = records.value
          .filter(rec => rec.categoryId === cat.id)
          .filter(rec => rec.type === 'outcome')
          .reduce((total, record) => {
            return (total += +record.amount)
          }, 0)
      }

      const percent = spend !== 0 ? 100 * spend / cat.limit : 0

      const progressPercent = percent > 100 ? 100 : percent

      const progressColor =
          percent < 60
            ? 'green'
            : percent < 100
              ? 'yellow'
              : 'red'

      const tooltipValue = spend
        ? cat.limit - spend
        : cat.limit

      const tooltip = `${tooltipValue < 0 ? localize('MoreThan') : localize('Stayed')} ${currency(Math.abs(tooltipValue))}`

      return {
        ...cat,
        progressColor,
        progressPercent,
        spend,
        tooltip
      }
    })
  }
}
