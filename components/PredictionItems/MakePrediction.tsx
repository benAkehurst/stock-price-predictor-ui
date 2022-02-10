import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@mantine/core";
import classes from "./MakePrediction.module.css";

export type MakePredictionProps = {
  onMakePrediction: (enteredStock: string) => void;
};

type Inputs = {
  stockSymbol: string;
};

function MakePrediction(props: MakePredictionProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) =>
    props.onMakePrediction(data.stockSymbol);

  return (
    <div className={classes.makePrediction}>
      <div className={classes.banner}>Make a prediction</div>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <div className={classes.control}>
          <label>Stock Symbol</label>
          <input
            placeholder="eg AAPL"
            {...register("stockSymbol", { required: true })}
          />
          {errors.stockSymbol && <span>Stock Symbol is required!</span>}
          <Button type="submit">Predict</Button>
        </div>
      </form>
    </div>
  );
}

export default MakePrediction;
