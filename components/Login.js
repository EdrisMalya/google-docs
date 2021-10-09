import React from 'react';
import Button from "@material-tailwind/react/Button";
import Image from "next/image";
import {signIn} from 'next-auth/client';

const Login = () => {
    return (
        <div className={'flex flex-col items-center justify-center min-h-screen py-2'}>
            <Image
                src={'https://links.papareact.com/1ui'}
                objectFit={'contain'}
                height={'300'}
                width={'550'}
            />
            <Button
                className={'w-44 wt-10'}
                color={'blue'}
                buttonType={'filled'}
                ripple={'light'}
                onClick={signIn}
            >
                Login

            </Button>
        </div>
    );
};

export default Login;