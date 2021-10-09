import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import {useRouter} from "next/router";
import {db} from "../../firebase";
import {useDocumentOnce} from "react-firebase-hooks/firestore";
import {getSession, session, signIn, useSession} from "next-auth/client";
import Login from "../../components/Login";
import TextEditor from "../../components/TextEditor";

const Doc = () => {
    const [session] = useSession();
    const router = useRouter();

    const {id} = router.query;
    const [snapshot, loadingSnapshot] = useDocumentOnce(
        db.collection('userDocs')
            .doc(session?.user?.email)
            .collection('docs')
            .doc(id)
    )
    if (!session) return <Login />
    if (!loadingSnapshot && !snapshot?.data()?.fileName){
        router.replace("/");
    }
    return (
        <div>
            <header className={'flex items-center p-3 pb-1'}>
                <span className={'cursor-pointer'} onClick={()=>router.push("/")}>
                    <Icon name={'description'} size={'3xl'} color={'blue'} />
                </span>
                <div className={'flex-grow'}>
                    <h2 className={'ml-4'}>{snapshot?.data().fileName}</h2>
                    <div className={'flex items-center space-x-1 ml-2 h-8 text-gray-600'}>
                        <p className={'option'}>File</p>
                        <p className={'option'}>Edit</p>
                        <p className={'option'}>View</p>
                        <p className={'option'}>Inert</p>
                        <p className={'option'}>Formats</p>
                        <p className={'option'}>Tools</p>
                    </div>
                </div>
                <Button
                    ripple={'light'}
                    size={'sm'}
                >
                    <Icon name={'people'} size={'md'} /> Share
                </Button>
                <img src={session?.user?.image} className={'rounded-full cursor-pointer h-10 w-10 ml-2'} alt=""/>
            </header>
            <TextEditor />
        </div>
    );
};

export default Doc;

export async function getServerSideProps(context){
    const session = await getSession(context);

    return {
        props:{
            session
        }
    }
}