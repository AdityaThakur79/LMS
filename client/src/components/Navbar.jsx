import { LogOut, Menu, School } from 'lucide-react'
import React from 'react'
import { Button } from "../components/ui/button"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DarkMode from './DarkMode'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet";
// import { Link } from 'react-router-dom'
import { Separator } from '@radix-ui/react-dropdown-menu'

const Navbar = () => {
    const user = false;

    return (
        <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
            {/* desktop */}
            <div className='md:flex max-w-7xl mx-auto hidden justify-between gap-10 h-full'>
                {/* Logo */}
                <div className='flex gap-2 items-center'>
                    <School size={"30"} />
                    <h1 className='hidden md:block font-extrabold text-2xl'>E-Learning</h1>
                </div>

                {/* User and DarkMode*/}
                <div className='flex items-center gap-8'>
                    {user ? (<DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <span>My Learning</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Edit Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Dashboard</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <LogOut />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>) :
                        <div className='flex gap-2 items-center'>
                            <Button variant="outline">Login</Button>
                            <Button>Signup</Button>
                        </div>
                    }
                    <DarkMode />
                </div>
            </div>

            {/* Mobile Device */}
            <div className="flex md:hidden items-center justify-between px-4 h-full">
                <h1 className="font-extrabold text-2xl">E-learning</h1>
                <div className='flex md:hidden items-center justify-between px-4 h-full'>
                    <MobileNavbar />
                </div>
            </div>
        </div>
    )
}

export default Navbar

const MobileNavbar = () => {
    const role = "instructor";
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    size="icon"
                    className="rounded-full hover:bg-gray-200"
                    variant="outline"
                >
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader className="flex flex-row items-center justify-between mt-2">
                    <SheetTitle>  E-Learning </SheetTitle>
                    <DarkMode />
                </SheetHeader>
                <Separator className="mr-2" />
                <nav className="flex flex-col space-y-4">
                    <span>My Learning</span>
                    <span>Edit Profile</span>
                    <p>Log out</p>
                </nav>
                {role === "instructor" && (
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit"
                            // onClick={() => navigate("/admin/dashboard")}
                            >Dashboard</Button>
                        </SheetClose>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
};
