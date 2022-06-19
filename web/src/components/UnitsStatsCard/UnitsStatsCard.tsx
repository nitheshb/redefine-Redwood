import { useState } from 'react'
import { IconButton, Menu, MenuItem, styled } from '@mui/material'
import { MoreVert, Edit } from '@mui/icons-material'
import SiderForm from '../SiderForm/SiderForm'

const CustomMenuItem = styled(MenuItem)(() => ({
  fontSize: '0.85rem',
}))

const UnitsStatsCard = ({ kind, feedData, bg }) => {
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
      className="drop-shadow-md min-w-full z-10 flex flex-col  max-w-md p-4 mx-auto my-0 rounded-lg "
      style={{ backgroundColor: bg }}
    >
      <div className="flex flex-row items-center justify-between">
        <h3 className="m-0 ml-2 text-sm font-semibold  leading-tight tracking-tight text-black border-0 border-gray-200 sm:text-1xl md:text-1xl ">
          Unit - {kind?.unit_no}
        </h3>
        <IconButton onClick={handleClick}>
          <MoreVert sx={{ fontSize: '1rem' }} />
        </IconButton>
      </div>
      <div className="flex flex-row justify-between px-2">
        <div>
          <span className="flex flex-row items-center justify-between mr-2">
            <span className="text-sm text-gray-700 mr-2">Unit Type</span>
            <span className="text-sm font-semibold">
              {feedData?.unitType || 0}
            </span>
          </span>
          <span className="flex flex-row items-center justify-between mr-2">
            <span className="text-sm text-gray-700 mr-2">Unit No:</span>
            <span className="text-sm font-semibold">
              {feedData?.unitNo || 0}
            </span>
          </span>
        </div>
        <div>
          <span className="flex flex-row items-center justify-between mr-2">
            <span className="text-sm text-gray-700 mr-2">
              SBA
              <span className="text-[10px] text-black-500">(sqft)</span>
            </span>
            <span className="text-sm font-semibold">{feedData?.sba || 0}</span>
          </span>
          <span className="flex flex-row items-center justify-between mr-2">
            <span className="text-sm text-gray-700 mr-2">
              Rate
              <span className="text-[10px] text-black-500">(sqft)</span>
            </span>
            <span className="text-sm font-semibold">{feedData?.rate || 0}</span>
          </span>
        </div>

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

export default UnitsStatsCard
