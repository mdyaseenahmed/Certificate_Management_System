import React from 'react'
import { isAuthenticated } from '../auth/helper';

const DashboardLanding = () => {

    const { user } = isAuthenticated();

  return (
    <>
        <div className="card mb-4">
            <h4 className="card-header">
                <b><span className="fa fa-user-circle-o"></span> { user.firstName  ? user.firstName : "User"}'s Info</b>
            </h4>
            <ul className="list-group lead text-left">
                <li className="list-group-item">
                    Name: <span className="badge badge-success mr-2">
                        {user.firstName+" "+user.lastName}
                    </span>
                </li>
                <li className="list-group-item">
                    Email: <span className="badge badge-success mr-2">
                        { user.email }
                    </span>
                </li>
                {/* <li className="list-group-item">
                    Certificate Count: <span className="badge badge-success mr-2">
                        { user.count ? user.count : 0 }
                    </span>
                </li> */}
            </ul>
        </div>
    </>
  )
}

export default DashboardLanding