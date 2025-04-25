const operations = {
  read: true,
  create: true,
  update: true,
  delete: true,
  viewStock: false,
};

export const endpoints: any = {
  User: { url: "api/user", operations: operations },
  Post: { url: "api/post", operations: operations },
  Bucket: { url: "api/bucket", operations: operations },
  Gallery: { url: "api/gallery", operations: operations },
  Message: { url: "api/message", operations: operations },
  Location: { url: "api/location", operations: operations },
  Testimonial: { url: "api/review", operations: operations },
  "Group Message": { url: "api/group-message", operations: operations },
};
