// 生成树的方法
export function buildTree(
  array: any[],
  options: {
    parentId: string | number,
    parentIdKey: string,
    childrenKey: string,
    primaryKey: string,
  } = {
      parentIdKey: "parentId",
      parentId: "0",
      childrenKey: "children",
      primaryKey: "_id",
    }
) {
  let newArray: any[] = [];

  array
    .sort((a: any, b: any) => {  // 根据index排序
      return a.index - b.index
    })
    .forEach((item) => {
      if (item[options.parentIdKey] === options.parentId) {
        let _item = Object.assign({}, item);
        let innerOptions = Object.assign({}, options, {
          parentId: item[options.primaryKey],
        });
        let children = buildTree(array, innerOptions);
        if (children.length) {
          _item[options.childrenKey] = children;
        }
        newArray.push(_item);
      }
    });
  return newArray;
}