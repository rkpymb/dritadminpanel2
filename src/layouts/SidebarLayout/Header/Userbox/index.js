import { useRef, useState, useContext, useEffect } from 'react';
import CheckloginContext from '/context/auth/CheckloginContext'
import NextLink from 'next/link';

import { MediaFilesFolder, MediaFilesUrl } from '/Data/config'
import { useRouter } from 'next/router';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,

  Popover,
  Typography
} from '@mui/material';


import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';

import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function HeaderUserbox() {
  const router = useRouter();
  const Contextdata = useContext(CheckloginContext)
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg',
    jobtitle: 'Project Manager'
  };

  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const [Show, setShow] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const LogOutUser = async () => {
    let text = "Do you Really want to log out?";
    if (confirm(text) == true) {
      Show && Contextdata.Logout()
      removeCookie('jwt_token');
      setShow(false);

    }


  };

  useEffect(() => {
    if (Contextdata.IsLogin) {
      setShow(true);
    }

  }, [Contextdata.Data]);

  const removeCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    alert('Logout Succesfully', 'success');
    window.location.reload();
  };

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar variant="rounded" alt={Show && Contextdata.Data.name} src={`${MediaFilesUrl}${MediaFilesFolder}/${Show && Contextdata.Data.dp}`} />
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">{Show && Contextdata.Data.name}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {Show && Contextdata.Data.Role == 1 ? 'Admin' : 'Staff'}
            </UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <Avatar variant="rounded" alt={Show && Contextdata.Data.name} src={`${MediaFilesUrl}${MediaFilesFolder}/${Show && Contextdata.Data.dp}`} />
          <UserBoxText>
            <UserBoxLabel variant="body1">{Show && Contextdata.Data.name}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {Show && Contextdata.Data.mobile}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />


        <Box sx={{ m: 1 }}>
          <Button color="primary" fullWidth onClick={LogOutUser}>
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Sign out
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default HeaderUserbox;
