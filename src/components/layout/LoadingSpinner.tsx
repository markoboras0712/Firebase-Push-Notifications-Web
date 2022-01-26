import classes from './style/LoadingSpinner.module.css';

export const LoadingSpinner: React.FC = () => (
  <div className={classes.loader__box}>
    <div className={classes.loader__spiner}></div>
  </div>
);
