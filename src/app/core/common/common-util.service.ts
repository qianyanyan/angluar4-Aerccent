export class  CommonUtil {

  public static setTreeData(source, id, parentId, children, rootValue) {
    let cloneData = JSON.parse(JSON.stringify(source));
    let tree = cloneData.filter(father => {
      let branchArr = cloneData.filter(child => {
        return father[id] == child[parentId];
      });
      if (branchArr.length > 0) {
        father[children] = branchArr;
      } else {
        father.isLeaf = true;
      }
      return father[parentId] == rootValue; //如果第一层不是parentId=0，请自行修改
    });
    return tree;
  }
}
