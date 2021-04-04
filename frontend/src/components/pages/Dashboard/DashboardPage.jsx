import React from 'react';
import { Link } from 'react-router-dom'
import { DeveloperList } from '../../DeveloperList';
import { FiUserPlus } from 'react-icons/fi';

import '../../../styles/pages/dashboard.css'

function DashboardPage() {
    return (
        <div className="content">
            <div className="title">
                <h1>Listagem de Desenvolvedores</h1>
            </div>
            <div className="link">
                <Link to="/craetedeveloper">
                    <FiUserPlus size={32} color="rgba(0, 0, 0, 0.6)" />
                </Link>
            </div>
            <DeveloperList />
        </div>
    )
}

export default DashboardPage;
