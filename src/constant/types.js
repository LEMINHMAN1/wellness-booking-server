
// Model
exports.User = 1;
exports.Exercise = 2;
exports.Answer = 3;
exports.Compare = 4;
exports.Comment = 5;
exports.Status = 6;
exports.Like = 7;
exports.Follow = 8;
exports.Hobby = 9;
exports.Link = 10;
exports.Setting = 11;
exports.Report = 12;

// User Type
exports.UserType = {
  LOCAL : 'LOCAL',
  FB : 'FB',
  GG : 'GG'
};

// User Type
exports.SettingType = {
  // todo, define later
};

// Permission Type
exports.PermissionType = {
  PUBLIC : 1,
  FRIEND: 2
};

// Protected Model
exports.PublicModel = {
                        Get: [1,3,4],
                        Insert:[1,3,4],
                        Update:[],
                        Delete:[]
                      };

// Request Type
exports.Read = 1;
exports.Insert = 2;
exports.Update = 3;
exports.Delete = 4;