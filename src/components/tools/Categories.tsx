import { getToolCategories } from "@/lib/tools"

const Categories = async () => {

  const response = await getToolCategories()
  const variousCategories = response.categories

  if (!response.status) {
    return (
      <div>No Categories Found, try again later</div>
    )
  }

  return (
    <div>{variousCategories?.map((category) => (category.name))}</div>
  )
}
export default Categories 
