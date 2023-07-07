const query = (targetPath, prefix) => {
  const dataObj = {};
  const files = import.meta.globEager('./queries/**/*.*');

  Object.entries(files).forEach(([path, module]) => {
    const fileName = path.replace('./queries/', '').replace('.js', '').split('/');
    const fileContent = module.default;

    let obj = dataObj;
    for (let i = 0; i < fileName.length - 1; i++) {
      if (!obj[fileName[i]]) {
        obj[fileName[i]] = {};
      }
      obj = obj[fileName[i]];
    }
    obj[fileName[fileName.length - 1]] = fileContent;
  });

  const targetPathArr = targetPath.split('/');
  let currentData = dataObj;
  targetPathArr.forEach((path) => {
    if (currentData === undefined) {
      return;
    }
    currentData = currentData[path];
  });

  if (prefix && typeof prefix === 'string') {
    currentData = currentData.map((item) => `${prefix}.${item}`);
  }

  return currentData;
};

export default query;
