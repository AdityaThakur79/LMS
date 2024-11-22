import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import React from 'react'
import Course from './Course';

const Profile = () => {
    const isLoading = false;
    const enrolledCourses = [1, 2, 3]
    return (

        <div className="max-w-4xl mx-auto px-4 my-24">
            <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
                <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
                        <AvatarImage
                            // src={user?.photoUrl || "https://github.com/shadcn.png"}
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div>
                    <div className="mb-2">
                        <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
                            Name:
                            <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                                {/* {user.name} */}
                                Aditya Thakur
                            </span>
                        </h1>
                    </div>
                    <div className="mb-2">
                        <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
                            Role:
                            <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                                {/* {user.role.toUpperCase()} */}
                                Instructor
                            </span>
                        </h1>
                    </div>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="sm" className="mt-2">
                                Edit Profile
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit Profile</DialogTitle>
                                <DialogDescription>
                                    Make changes to your profile here. Click save when you're
                                    done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label>Name</Label>
                                    <Input
                                        type="text"
                                        // value={name}
                                        // onChange={(e) => setName(e.target.value)}
                                        placeholder="Name"
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label>Profile Photo</Label>
                                    <Input
                                        // onChange={onChangeHandler}
                                        type="file"
                                        accept="image/*"
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                // disabled={updateUserIsLoading}
                                // onClick={updateUserHandler}
                                >
                                    {/* {updateUserIsLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                                            wait
                                        </>
                                    ) : (
                                        "Save Changes"
                                    )} */}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                </div>
            </div>

            <div className="max-w-4xl mx-auto my-24 px-4 md:px-0">
                <h1 className="font-medium text-2xl">Courses you're enrolled in</h1>
                <div className="my-5">
                    {isLoading ? (
                        <MyEnrolledCourse />
                    ) : enrolledCourses.length === 0 ? (
                        <h1>You are not enrolled in any course.</h1>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
                            {enrolledCourses.map((course, index) => (
                                <Course key={index} />
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Profile

const MyEnrolledCourse = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
        {[...Array(3)].map((_, index) => (
            <div
                key={index}
                className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
            ></div>
        ))}
    </div>
);