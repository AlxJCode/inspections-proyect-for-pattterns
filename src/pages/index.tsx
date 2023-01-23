import { LeftLayout } from "../layouts/LeftLayout";
import { IndexView } from "../views/general/IndexView";

export default function Home() {
	return (
		<>
			<LeftLayout title="Inicio" selectedKey={ 1 } >
				<IndexView />
			</LeftLayout>
		</>
	);
}
