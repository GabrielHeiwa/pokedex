import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Form, Input, Label, FormGroup } from "reactstrap";
import { api } from "../services/api";

function Login() {
	// Hooks
	const { control, handleSubmit } = useForm();

	// Functions
	async function onSubmit(data: any) {
		try {
			const { headers } = await api.post("/login", data);
			console.log(headers["set-cookie"])
			toast.success("Usuário logado com sucesso");
		} catch (error: any) {
			const errorMessage = error.message || error.response.data.message;
			toast.error(errorMessage);
		}
	}

	return (
		<div
			style={{ height: "100vh" }}
			className='w-100 d-flex align-items-center justify-content-center bg-danger'
		>
			<Form
				onSubmit={handleSubmit(onSubmit)}
				className='p-4 rounded shadow-lg bg-white col-11 col-md-6'
			>
				<h1 className='text-center py-4'>
					<strong>Pokedex</strong>
				</h1>

				<FormGroup>
					<Label
						style={{ fontWeight: 600, fontSize: 19 }}
						className='text-danger'
					>
						Treinador
					</Label>
					<Controller
						control={control}
						name='trainer_name'
						render={({ field: { onChange } }) => (
							<Input
								onChange={onChange}
								type='text'
								bsSize='lg'
							/>
						)}
					/>
				</FormGroup>

				<FormGroup>
					<Label
						style={{ fontWeight: 600, fontSize: 19 }}
						className='text-danger'
					>
						Senha
					</Label>
					<Controller
						control={control}
						name='password'
						render={({ field: { onChange } }) => (
							<Input
								onChange={onChange}
								type='password'
								bsSize='lg'
							/>
						)}
					/>
				</FormGroup>

				<FormGroup className='text-center'>
					<a href='/register'>Criar um usuário</a>
				</FormGroup>

				<FormGroup>
					<Input
						bsSize='lg'
						type='submit'
						value='Entrar'
					/>
				</FormGroup>
			</Form>
		</div>
	);
}

export { Login };
