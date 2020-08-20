
import RoleEntity from "../role.entity";

export default class CreateRoleDto implements Partial<RoleEntity>{
  name: string;
}

