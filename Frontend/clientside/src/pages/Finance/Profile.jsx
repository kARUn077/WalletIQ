import { useContext, useEffect, useRef, useState } from 'react';
import './finance.css'
import { AuthContext } from '../../context/AuthContext';
import { GlobalContext } from '../../context/GlobalContext';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
const Profile = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const { totalIncome, totalExpense, totalBalance, setUser_Id, getIncomes, getExpenses } = useContext(GlobalContext);
    const [isEditMode, setIsEditMode] = useState(false);
    const [profile, setProfile] = useState({ name: '', email: '', phone: false, address: '' });

    useEffect(() => {
        const { name, email, phone, address } = auth?.user;
        setProfile({ name, email, phone, address });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { name, email, phone, address } = auth?.user;
                setProfile({ name, email, phone, address });
                // Fetch income and expense data again
                await getIncomes();
                await getExpenses();
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [])



    const { name, email, phone, address } = profile;


    const handleInput = name => e => {
        setProfile({ ...profile, [name]: e.target.value });
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.patch(`${import.meta.env.VITE_REACT_APP_API}/api/v1/update-user`, profile);
            if (data?.success) {
                console.log(data?.updatedUser);
                setAuth({ ...auth, user: data?.updatedUser });
                setUser_Id(data?.updatedUser._id);
                setIsEditMode(false);
                const ls = JSON.parse(localStorage.getItem('auth'));
                ls.user = data?.updatedUser;
                localStorage.setItem('auth', JSON.stringify(ls));
                toast.success("Profile Updated Successfully");
            }
            else {
                toast.error(data?.message);
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }
    return (
        <div className="finance-container main-content-glass">
            <h1 style={{ marginBottom: '2rem' }}>
                <span style={{ opacity: 0.6, fontWeight: 400 }}>User</span> Profile
            </h1>

            <div className="profile-container">
                <div className="profile-img-container">
                    <img className='profile-photo' src="https://static.vecteezy.com/system/resources/previews/024/183/502/original/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg" alt="profile-avtar" />
                    <h3 style={{ marginTop: '1rem', fontWeight: 600 }}>{auth?.user?.name}</h3>
                    <p style={{ color: 'var(--text-muted)' }}>{auth?.user?.email}</p>
                </div>

                <form className="profile-detail-container" onSubmit={handleOnSubmit}>
                    <div className='profile-detail-item'>
                        <div className='detail-type'>Full Name</div>
                        <input className="profile-value" type="text" name='name' value={name} onChange={handleInput('name')} readOnly={!isEditMode} />
                    </div>
                    <div className='profile-detail-item'>
                        <div className='detail-type'>Email Address</div>
                        <input className="profile-value" type="email" value={email} readOnly />
                    </div>
                    <div className='profile-detail-item'>
                        <div className='detail-type'>Phone Number</div>
                        <input className="profile-value" type="text" name='phone' value={profile.phone || ''} onChange={handleInput('phone')} readOnly={!isEditMode} />
                    </div>
                    <div className='profile-detail-item'>
                        <div className='detail-type'>Address</div>
                        <input className="profile-value" type="text" name='address' value={address} onChange={handleInput('address')} readOnly={!isEditMode} />
                    </div>

                    <div style={{ marginTop: '1rem' }}>
                        {!isEditMode && <button className="edit-profile-btn" onClick={() => setIsEditMode(true)}>Edit Profile</button>}
                        {isEditMode && <button type="submit" className="edit-profile-btn">Save Changes</button>}
                    </div>
                </form>
            </div>

            <div className='amount-detail' style={{ marginTop: '2rem' }}>
                <div className='total-amount'>
                    <h2>Total Incomes</h2>
                    <p className='amount-value' style={{ color: 'var(--success)' }}>${totalIncome()}</p>
                </div>
                <div className='total-amount'>
                    <h2>Total Expenses</h2>
                    <p className='amount-value' style={{ color: 'var(--danger)' }}>${totalExpense()}</p>
                </div>
                <div className='total-amount'>
                    <h2>Total Balance</h2>
                    <span className='amount-value' style={{ color: (totalBalance() < 0 ? 'var(--danger)' : 'var(--success)') }}>
                        ${totalBalance()}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Profile;