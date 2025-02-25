import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components";
import useAuth from "../../hooks/useAuth";
import ROUTES from "../../constants/routes";
import {
  Person24Regular,
  Settings32Regular,
  SignOut24Regular,
} from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  console.log(user);
  return (
    <Menu hasIcons>
      <MenuTrigger>
        <Button
          appearance="subtle"
          shape="circular"
          size="large"
          icon={
            <Avatar
              size={32}
              color="neutral"
              image={{ src: user?.profilePicture }}
            />
          }
        />
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem
            icon={<Person24Regular />}
            onClick={() => navigate(ROUTES.PROFILE)}
          >
            Profile{" "}
          </MenuItem>
          <MenuItem icon={<Settings32Regular />}> Settings </MenuItem>
          <MenuItem onClick={logout} icon={<SignOut24Regular />}>
            Logout
          </MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

export default UserMenu;
