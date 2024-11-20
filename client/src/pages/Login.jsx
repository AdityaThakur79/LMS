import { Button } from "../components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../components/ui/tabs"
import { useState } from "react"

function Login() {
    const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });
    const [loginData, setLoginData] = useState({ email: "", password: "" });

    const inputHandler = (e, type) => {
        const { name, value } = e.target;
        if (type === "signup") {
            setSignupData({ ...signupData, [name]: value })
        }
        else {
            setLoginData({ ...loginData, [name]: value })
        }
    }

    const handleFormSubmit = (type) => {
        const inputData = type === "signup" ? signupData : loginData;
        console.log(inputData)
    }

    return (
        <div className="flex items-center w-full justify-center">
            <Tabs defaultValue="signup" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signup">Signup</TabsTrigger>
                    <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>

                {/* Signup */}
                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>Signup</CardTitle>
                            <CardDescription>
                                Create a new account and click signup when you're done.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label>Name</Label>
                                <Input type="text"
                                    name="name"
                                    value={signupData.name}
                                    onChange={(e) => inputHandler(e, "signup")}
                                    placeholder="Enter Your Name"
                                    required />
                            </div>
                            <div className="space-y-1">
                                <Label>Email</Label>
                                <Input type="email"
                                    name="email"
                                    value={signupData.email}
                                    onChange={(e) => inputHandler(e, "signup")}
                                    placeholder="abc@gmail.com"
                                    required />
                            </div>
                            <div className="space-y-1">
                                <Label  >Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    value={signupData.password}
                                    onChange={(e) => inputHandler(e, "signup")}
                                    placeholder="Enter your Password"
                                    required />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => handleFormSubmit("signup")}>Signup</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Login */}
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Login your password here. After signup, you'll be logged in.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label  >Email</Label>
                                <Input type="email"
                                    name="email"
                                    value={loginData.email}
                                    onChange={(e) => inputHandler(e, "login")}
                                    placeholder="abc@gmail.com"
                                    required />
                            </div>
                            <div className="space-y-1">
                                <Label  >Password</Label>
                                <Input type="password"
                                    name="password"
                                    value={loginData.password}
                                    onChange={(e) => inputHandler(e, "login")}
                                    placeholder="Enter your Password"
                                    required />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => handleFormSubmit("login")}>Login</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>

    )
}
export default Login;