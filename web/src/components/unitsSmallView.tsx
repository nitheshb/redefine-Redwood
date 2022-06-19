/* eslint-disable prettier/prettier */
import { useState } from 'react'
import { IconButton, Menu, MenuItem, styled } from '@mui/material'
import { MoreVert, Edit } from '@mui/icons-material'
import SiderForm from './SiderForm/SiderForm'

const CustomMenuItem = styled(MenuItem)(() => ({
  fontSize: '0.85rem',
}))

const UnitsSmallViewCard = ({ kind, feedData, bg }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [sliderInfo, setSliderInfo] = useState({
    open: false,
    title: '',
    sliderData: {},
  })

  const handleSliderClose = () => {
    setSliderInfo({
      open: false,
      title: '',
      sliderData: {},
    })
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = async (menuItem) => {
    setAnchorEl(null)
    if (menuItem === 'edit') {
      setSliderInfo({
        open: true,
        title: 'Edit Block',
        sliderData: {
          block: feedData,
        },
      })
    }
  }
  return (
    <div
      className=" min-w-full z-10 flex flex-col  max-w-md p-2 mx-auto my-0 rounded-sm "
      style={{ backgroundColor: bg }}
    >
      <div className="flex flex-row items-center justify-between">
        <h3 className="m-0 ml-2 text-sm font-semibold  leading-tight tracking-tight text-black border-0 border-gray-200 sm:text-1xl md:text-1xl ">
          #{kind?.unit_no}
        </h3>
        {/* <IconButton onClick={handleClick}>
          <MoreVert sx={{ fontSize: '1rem' }} />
        </IconButton> */}
      </div>
      <div className="flex flex-row justify-between px-2">
        <span className="flex flex-row items-center justify-between mr-2">
          <span className="text-sm font-">
            {kind?.builtup_area || 0} sqft
            
          </span>
        </span>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <CustomMenuItem onClick={() => handleClose('edit')}>
            <Edit className="mr-1" sx={{ fontSize: '1rem' }} />
            Edit
          </CustomMenuItem>
        </Menu>
      </div>
      <SiderForm
        open={sliderInfo.open}
        setOpen={handleSliderClose}
        title={sliderInfo.title}
        data={sliderInfo.sliderData}
      />
    </div>
  )
}

export default UnitsSmallViewCard
