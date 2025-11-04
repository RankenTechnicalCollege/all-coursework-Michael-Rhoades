import { getDatabase } from "../database.js";
import { GetUserById } from "../database.js";

export const hasPermission = (permission) => {
  return async (req, res, next) => {
    try {
      const userId = req.session.userId;
      const user = await GetUserById(userId);
      const userRoles = user.role || [];

      if (!Array.isArray(userRoles) || userRoles.length == 0) {
        return res.status(403).json({error: "No roles assigned to user"})
      }

      const db = await getDatabase();

      const roleDocuments = await db.collection('role').find({role:{$in:userRoles}}).toArray();

      const hasRequiredPermission = roleDocuments.some(roleDoc => {
        return roleDoc.permissions && roleDoc.permissions[permission] === true;
      });

      if (!hasRequiredPermission) {
        return res.status(403).json({error: `Permission denied. Required permission: ${permission}`});
      }
      next();
    }
    catch (error) {
      console.error("Permission check error:", error);
      return res.status(500).json({error: "Error checking permissions."})
    }
  }
}

export const hasAnyPermission = (permissions) => {
  return async (req, res, next) => {
    try {
      if (!req.session) {
        return res.status(401).json({error: "Authentication required"});
      }

      const userId = req.session.userId;
      const user = await GetUserById(userId);
      const userRoles = user.role || [];

      if (!Array.isArray(userRoles) || userRoles.length === 0) {
        return res.status(403).json({error: "No roles assigned to user"})
      }

      const db = await getDatabase();

      const roleDocuments = await db.collection('role').find({role:{$in:userRoles}}).toArray();
 // Get database
      // const db = await getDatabase();
      // const rolesCollection = db.collection('role');

      // // Fetch all role documents for user's roles
      // const roleDocuments = await rolesCollection
      //   .find({ role: { $in: userRoles } })
      //   .toArray();


      const hasRequiredPermission = roleDocuments.some(roleDoc => {
        if (!roleDoc.permissions) {
          return false;
        }
        return permissions.some(permission => roleDoc.permissions[permission] === true)
      });

      if (!hasRequiredPermission) {
        return res.status(403).json({error: `Permission denied. Required permission (any of): ${permissions.join(", ")}`});
      }
      next();
    }
    catch (error) {
      console.error("Permission check error:", error);
      return res.status(500).json({error: "Error checking permissions."})
    }
  }
}