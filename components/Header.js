import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import {getSession, signOut, useSession} from "next-auth/client";

const Header = () => {
    const [session] = useSession();
    return (
        <header className={'flex items-center sticky top-0 z-50 text-center pxx-4 py-2 shadow-md bg-white'}>
            <Button
                color={'gray'}
                buttonType={'outline'}
                rounded={true}
                iconOnly={true}
                ripple={'dark'}
                className={'h-20 w-20 border-0'}
            >
                <Icon name={'menu'} size={'3xl'} />
            </Button>
            <Icon name={'description'} size={'5xl'} color={'blue'} />
            <h1 className={'ml-2 text-gray-700 text-2xl'}>Docs</h1>
            <div className={'flex mx-5 md:mx-20 flex-grow items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-lg focus-within:shadow-md'}>
                <Icon name={'search'} size={'3xl'} color={'gray'} />
                <input type="text" placeholder={'Search'} className={'bg-transparent flex-grow px-5 outline-none text-base'} />
            </div>
            <Button
                color={'gray'}
                buttonType={'outline'}
                rounded={true}
                iconOnly={true}
                ripple={'dark'}
                className={'ml-5 md:ml-20 h-20 w-20 border-0'}
            >
                <Icon name={'apps'} size={'3xl'} color={'gray'} />
            </Button>
            <img
                onClick={signOut}
                src={session?.user?.image}
                className={'cursor-pointer h-12 w-12 rounded-full ml-2'}
                alt=""/>
        </header>
    );
};

export default Header;
