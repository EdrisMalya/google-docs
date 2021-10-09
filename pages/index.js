import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from "../components/Header";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Login from "../components/Login";
import {getSession, useSession} from "next-auth/client";
import Modal from '@material-tailwind/react/Modal';
import ModalBody from '@material-tailwind/react/ModalBody';
import ModalFooter from '@material-tailwind/react/ModalFooter';
import {useState} from "react";
import {db} from "../firebase";
import firebase from "firebase";
import {
    useCollectionOnce
} from "react-firebase-hooks/firestore";
import DocumentRow from "../components/DocumentRow";

export default function Home() {
    const [session] = useSession();
    const [showModal, setShowModal] = useState(false);
    const [input, setInput] = useState('');

    const [snapshot] = useCollectionOnce(
        db.collection('userDocs').
        doc(session?.user?.email)
            .collection('docs')
            .orderBy('timestamp','desc')
    )


    const createDocument = () => {
        if (!input) return;
        db.collection('userDocs')
            .doc(session.user.email)
            .collection('docs')
            .add({
                fileName: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        setInput('');
        setShowModal(false);
    }
    if (!session) return <Login />
    const modal = (
        <Modal size={'sm'} active={showModal} toggler={()=>setShowModal(false)}>
            <ModalBody>
                <input
                    type="text"
                    value={input}
                    onChange={(e)=>setInput(e.target.value)}
                    className={'outline-none w-full'}
                    placeholder={'Enter name of document...'}
                    onKeyDown={(e)=>e.key==='Enter' && createDocument()}
                />
            </ModalBody>
            <ModalFooter>
                <Button
                    color={'blue'}
                    buttonType={'link'}
                    onClick={(e)=>setShowModal(false)}
                    ripple={'dark'}
                >
                    Cancel
                </Button>
                <Button color={'blue'} onClick={()=>createDocument()} ripple={'light'}>
                    Create
                </Button>
            </ModalFooter>
        </Modal>
    );
    return (
        <div>
            <Head>
              <title>Google Docs</title>
              <link rel="icon" href="../public/favicon.ico"/>
            </Head>
            <Header />
            {modal}
            <section className={'px-10 pb-10 bg-[#F8F9FA]'}>
                <div className={'max-w-3xl mx-auto'}>
                    <div className={'py-6 flex items-center justify-between'}>
                        <h2 className={'text-gray-700'}>Start a new document</h2>
                        <Button
                            color={'gray'}
                            buttonType={'outline'}
                            iconOnly={true}
                            ripple={'dark'}
                            className={'border-0'}
                        >
                            <Icon name={'more_vert'} size={'3xl'} color={'gray'} />
                        </Button>
                    </div>
                    <div>
                        <div onClick={()=>setShowModal(true)} className={'relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700'}>
                            <Image
                                layout={'fill'}
                                src={'https://links.papareact.com/pju'} />
                        </div>
                        <p className={'ml-2 mt-2 text-sm text-gray-700 font-semibold'}>Blank</p>
                    </div>
                </div>
            </section>
            <section className={'bg-white'}>
                <div className={'max-w-3xl mx-auto py-8'}>
                    <div className={'px-5 text-sm md:px-10 pb-6 flex items-center space-x-10'}>
                        <p className={'text-gray-700 flex-grow'}>
                            My documents
                        </p>
                        <p className={'text-gray-700'}>
                            Date Created
                        </p>
                        <Icon name={'folder'} size={'3xl'} color={'gray'} />
                    </div>
                    {snapshot?.docs.map(item=>(
                        <DocumentRow
                            key={item.id}
                            id={item.id}
                            fileName={item.data().fileName}
                            date={item.data().timestamp}
                        />
                    ))}
                </div>
            </section>
        </div>
    )
}

export async function getServerSideProps(context){
    const session = await getSession(context);
    return {
        props:{
            session,
        }
    }
}