module.exports = {
  async up(db, client) {
    await db.collection("institutes").insertMany([
      {
        name: "Playhouse"
      },
      {
        name: "School"
      },
      {
        name: "College"
      },
      {
        name: "Competitive exam center"
      }
    ]);
  },

  async down(db, client) {
    await db.collection("institutes").deleteMany({
      name: {
        $in: ["Playhouse", "School", "College", "Competitive exam center"]
      }
    });
  }
};
