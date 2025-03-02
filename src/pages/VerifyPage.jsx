import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UseAxiosPublic from '../hooks/useAxiosPublic';

const VerifyPage = () => {
    const { uniqueId } = useParams();
    const navigate = useNavigate();
    const axiosPublic = UseAxiosPublic();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('access-token'); 

    useEffect(() => {
        if (!uniqueId) return; 

        axiosPublic.get(`/verifylink/${uniqueId}`, {
            headers: { Authorization: `Bearer ${token}` }, 
        })
        .then((res) => {
            if (res.data.fileURL) {
                window.location.href = res.data.fileURL; 
            }
        })
        .catch((error) => {
            if (error.response) {
                if (error.response.status === 401) {
                    navigate('/login'); // 
                } else if (error.response.status === 410) {
                    setError('This link has expired.');
                } else {
                    setError('Link not found.');

                }
            } else {
                setError('Network error. Please try again.');
            }
        })
        .finally(() => {
            setLoading(false);
        });
    }, [axiosPublic, uniqueId, navigate, token]);

    return (
        <div className="min-h-screen flex text-2xl items-center justify-center">
            {loading ? <p>Checking link...</p> : error ? <p>{error}</p> : <p>Redirecting...</p>}
        </div>
    );
};

export default VerifyPage;
