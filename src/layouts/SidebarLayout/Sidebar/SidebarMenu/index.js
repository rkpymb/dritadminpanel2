import { useContext } from 'react';
import { useRouter } from 'next/router';

import {
  ListSubheader,
  alpha,
  Box,
  List,
  styled,
  Button,
  ListItem
} from '@mui/material';
import NextLink from 'next/link';
import { SidebarContext } from 'src/contexts/SidebarContext';
import CheckloginContext from '/context/auth/CheckloginContext'
import { BsFillTicketPerforatedFill, BsStack, BsFillGeoAltFill, BsFillLaptopFill, BsTicketDetailed, BsUiChecksGrid, BsFillPeopleFill, BsPersonFillLock, BsPlugin, BsCurrencyRupee, BsFileEarmarkTextFill, BsShieldCheck, BsCalendar2CheckFill, BsFillPieChartFill, BsCartPlusFill } from "react-icons/bs";



const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
    'transform',
    'opacity'
  ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

function SidebarMenu() {
  const { closeSidebar } = useContext(SidebarContext);
  const router = useRouter();
  const currentRoute = router.pathname;

  const Contextdata = useContext(CheckloginContext)

  return (
    <>
      {Contextdata.Data.Role == 1 &&
        <MenuWrapper>

          <List
            component="div"
            subheader={
              <ListSubheader component="div" disableSticky>
                Main Dashboards
              </ListSubheader>
            }
          >
            <SubMenuWrapper>
              <List component="div">
                <ListItem component="div">
                  <NextLink href="/admin/" passHref>
                    <Button
                      className={
                        currentRoute === '/admin/' ? 'active' : ''
                      }
                      disableRipple
                      component="a"
                      onClick={closeSidebar}
                      startIcon={<BsFillLaptopFill />}
                    >
                      Dashboard
                    </Button>
                  </NextLink>
                </ListItem>
                <ListItem component="div">
                  <NextLink href="/admin/users" passHref>
                    <Button
                      className={
                        currentRoute === '/admin/users' ? 'active' : ''
                      }
                      disableRipple
                      component="a"
                      onClick={closeSidebar}
                      startIcon={<BsFillPeopleFill />}
                    >
                      Users
                    </Button>
                  </NextLink>
                </ListItem>
                {/* <ListItem component="div">
                  <NextLink href="/admin/staff" passHref>
                    <Button
                      className={
                        currentRoute === '/admin/staff' ? 'active' : ''
                      }
                      disableRipple
                      component="a"
                      onClick={closeSidebar}
                      startIcon={<BsPersonFillLock />}
                    >
                      Staff
                    </Button>
                  </NextLink>
                </ListItem> */}

                <ListItem component="div">
                  <NextLink href="/admin/attendance" passHref>
                    <Button
                      className={
                        currentRoute === '/admin/attendance' ? 'active' : ''
                      }
                      disableRipple
                      component="a"
                      onClick={closeSidebar}
                      startIcon={<BsCalendar2CheckFill />}
                    >
                      Attendance
                    </Button>
                  </NextLink>
                </ListItem>
                <ListItem component="div">
                  <NextLink href="/admin/branches" passHref>
                    <Button
                      className={
                        currentRoute === '/admin/branches' ? 'active' : ''
                      }
                      disableRipple
                      component="a"
                      onClick={closeSidebar}
                      startIcon={<BsFillGeoAltFill />}
                    >
                      Branches
                    </Button>
                  </NextLink>
                </ListItem>


                <ListItem component="div">
                  <NextLink href="/admin/shifts" passHref>
                    <Button
                      className={
                        currentRoute === '/admin/shifts' ? 'active' : ''
                      }
                      disableRipple
                      component="a"
                      onClick={closeSidebar}
                      startIcon={<BsFillPieChartFill />}
                    >
                      Shifts
                    </Button>
                  </NextLink>
                </ListItem>
                <ListItem component="div">
                  <NextLink href="/admin/seats" passHref>
                    <Button
                      className={
                        currentRoute === '/admin/seats' ? 'active' : ''
                      }
                      disableRipple
                      component="a"
                      onClick={closeSidebar}
                      startIcon={<BsUiChecksGrid />}
                    >
                      Seats
                    </Button>
                  </NextLink>
                </ListItem>


                <ListItem component="div">
                  <NextLink href="/admin/addons" passHref>
                    <Button
                      className={
                        currentRoute === '/admin/addons' ? 'active' : ''
                      }
                      disableRipple
                      component="a"
                      onClick={closeSidebar}
                      startIcon={<BsCartPlusFill />}
                    >
                      Addon Products
                    </Button>
                  </NextLink>
                </ListItem>
                <ListItem component="div">
                  <NextLink href="/admin/subscription-pass" passHref>
                    <Button
                      className={
                        currentRoute === '/admin/subscription-pass' ? 'active' : ''
                      }
                      disableRipple
                      component="a"
                      onClick={closeSidebar}
                      startIcon={<BsFillTicketPerforatedFill />}
                    >
                      Subscription Pass
                    </Button>
                  </NextLink>
                </ListItem>
                <ListItem component="div">
                  <NextLink href="/admin/user-wallet" passHref>
                    <Button
                      className={
                        currentRoute === '/admin/user-wallet' ? 'active' : ''
                      }
                      disableRipple
                      component="a"
                      onClick={closeSidebar}
                      startIcon={<BsCurrencyRupee />}
                    >
                      User Wallet
                    </Button>
                  </NextLink>
                </ListItem>

              </List>



            </SubMenuWrapper>
          </List>
          <List
            component="div"
            subheader={
              <ListSubheader component="div" disableSticky>
                Orders and Subscriptions
              </ListSubheader>
            }
          >
            <SubMenuWrapper>
              <List component="div">

                <ListItem component="div">
                  <NextLink href="/admin/orders" passHref>
                    <Button
                      className={
                        currentRoute === '/admin/orders' ? 'active' : ''
                      }
                      disableRipple
                      component="a"
                      onClick={closeSidebar}
                      startIcon={<BsFileEarmarkTextFill />}
                    >
                      Manage  Orders
                    </Button>
                  </NextLink>
                </ListItem>
                <ListItem component="div">
                  <NextLink href="/admin/subscriptions" passHref>
                    <Button
                      className={
                        currentRoute === '/admin/subscriptions' ? 'active' : ''
                      }
                      disableRipple
                      component="a"
                      onClick={closeSidebar}
                      startIcon={<BsTicketDetailed />}
                    >
                      Library Subscriptions
                    </Button>
                  </NextLink>
                </ListItem>
                <ListItem component="div">
                  <NextLink href="/admin/addon-subscriptions" passHref>
                    <Button
                      className={
                        currentRoute === '/admin/addon-subscriptions' ? 'active' : ''
                      }
                      disableRipple
                      component="a"
                      onClick={closeSidebar}
                      startIcon={<BsStack />}
                    >
                      Addons Subscriptions
                    </Button>
                  </NextLink>
                </ListItem>

              </List>
            </SubMenuWrapper>
          </List>
          <List
            component="div"
            subheader={
              <ListSubheader component="div" disableSticky>
                Settings
              </ListSubheader>
            }
          >
            <SubMenuWrapper>
              <List component="div">

                {/* <ListItem component="div">
                  <NextLink href="/admin/settings/payment-method" passHref>
                    <Button
                      className={
                        currentRoute === '/admin/settings/payment-method' ? 'active' : ''
                      }
                      disableRipple
                      component="a"
                      onClick={closeSidebar}
                      startIcon={<BsPlugin />}
                    >
                      Payment Method
                    </Button>
                  </NextLink>
                </ListItem> */}
                <ListItem component="div">
                  <NextLink href="/admin/settings" passHref>
                    <Button
                      className={
                        currentRoute === '/admin/settings' ? 'active' : ''
                      }
                      disableRipple
                      component="a"
                      onClick={closeSidebar}
                      startIcon={<BsPlugin />}
                    >
                    Settings
                    </Button>
                  </NextLink>
                </ListItem>
               
              </List>
            </SubMenuWrapper>
          </List>
          <List
            component="div"
            subheader={
              <ListSubheader component="div" disableSticky>
                Billings & Credits
              </ListSubheader>
            }
          >
            <SubMenuWrapper>
              <List component="div">

                <ListItem component="div">
                  <NextLink href="/admin/credits" passHref>
                    <Button
                      className={
                        currentRoute === '/admin/credits' ? 'active' : ''
                      }
                      disableRipple
                      component="a"
                      onClick={closeSidebar}
                      startIcon={<BsCurrencyRupee />}
                    >
                      My Credits
                    </Button>
                  </NextLink>
                </ListItem>
                <ListItem component="div">
                  <NextLink href="/admin/my-subscription" passHref>
                    <Button
                      className={
                        currentRoute === '/admin/my-subscription' ? 'active' : ''
                      }
                      disableRipple
                      component="a"
                      onClick={closeSidebar}
                      startIcon={<BsShieldCheck />}
                    >
                      My Subscription
                    </Button>
                  </NextLink>
                </ListItem>
                {/* <ListItem component="div">
                  <NextLink href="/admin/my-orders" passHref>
                    <Button
                      className={
                        currentRoute === '/admin/my-orders' ? 'active' : ''
                      }
                      disableRipple
                      component="a"
                      onClick={closeSidebar}
                      startIcon={<BsFileEarmarkTextFill />}
                    >
                      My Orders
                    </Button>
                  </NextLink>
                </ListItem> */}

              </List>
            </SubMenuWrapper>
          </List>

        </MenuWrapper>
      }
    </>
  );
}

export default SidebarMenu;
