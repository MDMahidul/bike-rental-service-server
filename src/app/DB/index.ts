import config from '../config';
import { USER_ROLE } from '../modules/user/user.constant';
import { User } from '../modules/user/user.model';

const superUser = {
  id: 'SA-0001',
  name: 'super admin',
  email: config.super_admin_email,
  address: 'Dhaka,Bangladesh',
  contactNo: '0111223344',
  password: config.super_admin_password,
  role: USER_ROLE.superAdmin,
  status: 'in-progress',
  isDeleted: false,
};

/* after connecting the db will check if there is any super admin, if not then auto create one */
const seedSuperAdmin = async () => {
  const isSuperAdminExists = await User.findOne({ role: USER_ROLE.superAdmin });

  if (!isSuperAdminExists) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
