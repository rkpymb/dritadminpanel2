

import MYS from '/Styles/mystyle.module.css'
import AdminBranchSelector from '../../../pages/components/Admin/AdminBranchSelector'

const index = () => {
  return (
    <div>
      <div className={MYS.logomainDB}>
        <div className={MYS.logomain}>
          <img src='/Logo/logo.png' alt='logo' width={'100%'} />
        </div>
      </div>
      <div>

        <AdminBranchSelector />

      </div>
    </div>
  )
}

export default index
