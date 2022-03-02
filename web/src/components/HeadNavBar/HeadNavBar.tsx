/* eslint-disable jsx-a11y/anchor-is-valid */
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useDispatch } from 'react-redux'
import { useAuth } from 'src/context/firebase-auth-context'
import { logout as logoutAction } from 'src/state/actions/user'

const HeadNavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const { logout } = useAuth()
  const dispatch = useDispatch()
  const handleClose = async (menuItem) => {
    setAnchorEl(null)
    if (menuItem === 'Logout') {
      await logout()
      dispatch(logoutAction())
    }
  }

  return (
    <div>
      <div className="flex items-center flex-shrink-0 h-16 px-2  pl-0 bg-white bg-opacity-75 ">
        {/* <h1 className="text-lg font-medium">redefine.</h1> */}
        <span
          style={{ marginLeft: '-1%' }}
          className="relative z-10 flex items-center w-auto text-2xl font-extrabold leading-none text-black select-none pl-0 ml-4"
        >
          redefine.
        </span>
        <button className="flex items-center justify-center h-10 px-4 ml-auto "></button>
        <button className="flex items-center justify-center h-10 text-sm font-medium "></button>
        <button
          className="relative ml-2 text-sm focus:outline-none group  items-center justify-center h-10 text-sm font-medium"
          onClick={handleClick}
        >
          <div className="flex items-center justify-between w-10 h-10 rounded ">
            <svg
              width="20"
              fill="currentColor"
              height="20"
              className="text-gray-800"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
            </svg>
          </div>
        </button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={() => handleClose('Logout')}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  )
}

export default HeadNavBar
