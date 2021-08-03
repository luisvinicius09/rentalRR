import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Container } from 'reactstrap';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import { handleSideBar, handleProfileModal, fetchCarData, handleCarsModal, fetchCarsData, handleAppoimentModal } from '../state/actions';
import styles from '../assets/css/car.module.css';
import CarsModal from '../components/CarsModal';
import ProfileModal from '../components/ProfileModal';
import AppoimentModal from '../components/AppoimentModal';

const Car = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { car_id } = useParams();

  const car = state.carsData.car;

  useEffect(() => {
    if (state.carsData.car === undefined) {
      dispatch(fetchCarData(car_id));
    }
  }, [dispatch, car_id, state.carsData.car]);

  useEffect(() => {
    dispatch(fetchCarsData());
  }, [dispatch]);

  console.log(state);

  // Side bar
  const handleSB = () => {
    dispatch(handleSideBar());
  };

  // Profile modal
  const handlePM = () => {
    dispatch(handleProfileModal());
  };

  // Cars modal
  const handleCM = () => {
    dispatch(handleCarsModal());
  };

  const handleA = () => {
    dispatch(handleAppoimentModal());
  };

  return (
    <div className={styles.wrapper}>
      {state.utils.sideBar ? <SideBar /> : null}
      {!state.carsData.loading && car && (
        <Container fluid={true} className={styles.container}>
          <NavBar handlerSB={handleSB} handlerPM={state.user.loggedIn ? null : handlePM} />
          <div className={styles.infoContainer}>
            <div className={styles.imageContainer}>
              <img src={car.image_url} alt={car.name}/>
            </div>
            <div className={styles.tableContainer}>
              <table>
                <tbody>
                  <tr className={styles.tableRow}>
                    <td>Price: </td>
                    <td><b>{car.price}</b></td>
                  </tr>
                  <tr className={styles.tableRow}>
                    <td>Fee:</td>
                    <td><b>{car.fee}</b></td>
                  </tr>
                </tbody>
              </table>
              <button type="button" onClick={() => handleA()} className={styles.testDrive}><b>TEST DRIVE</b></button>
            </div>
            <div className={styles.nameContainer}>
              <h1>{car.name}</h1>
            </div>
          </div>

          <CarsModal toggleHandler={handleCM}/>

          {/* <ProfileModal isOpen={state.utils.profile} toggleHandler={handlePM}/> */}

          <AppoimentModal isOpen={state.utils.appoimentsModal} toggleHandler={handleA} id={car_id}/>

        </Container>
      )}
    </div>
  );
};

export default Car;