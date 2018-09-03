export default {

  // 总数量
  totalCount (state) {
    return state.cartFoods.reduce((preTotal, food) => preTotal + food.count, 0)
  },

  // 总价格
  totalPrice (state) {
    return state.cartFoods.reduce((preTotal, food) => preTotal + food.count*food.price, 0)
  },

  // 评价的总数量
  ratingsCount (state) {
    return state.ratings.length
  },

  // 满意评价的数量
  positiveRatingsCount (state) {
    return state.ratings.reduce((preTotal, rating) => preTotal + (rating.rateType===0 ? 1 : 0), 0)
  },

  // 不满意评价的数量
  negativeRatingsCount (state, getters) {
    return getters.ratingsCount - getters.positiveRatingsCount
  }
}