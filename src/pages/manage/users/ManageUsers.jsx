import "./manageusers.scss"

import BasicTable from '../../../components/tables/Table'
import Sidebar from '../../../components/sidebar/Sidebar'
import Header from '../../../components/header/Header'
import CheckboxesTags from "../../../components/checkbox/SelectUsers"

import Button from '@mui/material/Button';


const ManageUsers = ({ type }) => {


  return (
    <div>
      <Sidebar />
      
      <main>
        <Header />

        <div className="main-content">
            <div className="mainTitle">ASSIGN USER ROLES</div>
            <div className="split">
                <div className="roleContainer">
                    <div className="checkboxWrapper">
                        <div className="mainTitle">SELECT USERS</div>
                        <CheckboxesTags />
                    </div>
                    <div className="checkboxWrapper">
                        <div className="mainTitle">SELECT ROLES</div>
                        <CheckboxesTags />
                    </div>
                    <div className="checkboxWrapper">
                        <div className="mainTitle">SELECT ROLES</div>
                        <CheckboxesTags />
                    </div>
            
                    <div className="buttons">
                        <span className="button">
                            <Button sx={{ minWidth: 150 }} variant="outlined" color="error">Remove Role</Button>
                        </span>
                        <span className="button">
                            <Button sx={{ minWidth: 150 }} variant="contained">Add Role</Button>
            
                        </span>
                    </div>
            
                </div>
            
            </div>
              <div className="tableWrapper">
                    <div className="mainTitle">ALL USERS</div>
                    <BasicTable type="Tickets"/>
                </div>
        </div>
      </main>
    </div>
  )
}

export default ManageUsers