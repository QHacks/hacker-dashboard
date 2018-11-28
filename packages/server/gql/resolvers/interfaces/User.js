const { DatabaseError } = require("../../../errors");

module.exports = {
  User: {
    __resolveType(user, context, info) {
      return "Hacker";
    }
  },
  QueryRoot: {
    async user(
      parent,
      args,
      {
        user,
        db: { User, OAuthUser }
      }
    ) {
      const currentUser = await User.findOne({
        where: { id: user.id },
        include: OAuthUser
      });
      if (!currentUser) {
        throw new DatabaseError("Unable to find user");
      }

      return {
        ...currentUser.dataValues,
        oauthInfo: { role: currentUser.OAuthUser.role }
      };
    }
  }
};
