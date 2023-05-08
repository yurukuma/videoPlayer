import { $axios } from "@Services/http"

export const getFollowingList = () => {
  return $axios
    .get('/following_list')
    .then((res) => {
      return res.items
    })
    .catch(() => {
      throw new Error("系統忙碌中，請稍後再試!")
    })
}
