exports.formatDates = list => {
  if (!list.length) return [];
  return list.map(({ created_at, ...data }) => {
    const newList = {
      ...data,
      created_at: new Date(created_at)
    };
    return newList;
  });
};

exports.makeRefObj = (list, val, key) => {
  if (!list.length) return {};
  const refObj = {};
  list.forEach(item => {
    refObj[item[val]] = item[key];
  });
  return refObj;
};

exports.formatComments = (
  comments,
  lookup,
  keyToAdd = "article_id",
  KeyToRemove = "belongs_to"
) => {
  const formattedComments = comments.map((comment) => {
    const { [KeyToRemove]: lookupTarget, created_by, created_at, ...restOfComment } = comment;
    const formattedComment = { ...restOfComment, [keyToAdd]: lookup[lookupTarget], author: created_by, created_at: new Date(created_at) };
    return formattedComment;
  });

  return formattedComments;
};