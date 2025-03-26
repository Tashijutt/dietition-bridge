
import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Download, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface ChatSession {
  id: string;
  userId: string;
  userName: string;
  startTime: string;
  duration: string;
  messageCount: number;
  healthCondition: string;
  status: "completed" | "in-progress" | "abandoned";
}

const AdminChats = () => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // In a real app, this would be an API call
    // For demo purposes, we'll use mock data
    const mockChatSessions: ChatSession[] = [
      {
        id: "chat-001",
        userId: "user-1",
        userName: "Ayesha Khan",
        startTime: "2023-11-22T10:30:00",
        duration: "12:30",
        messageCount: 18,
        healthCondition: "Diabetes",
        status: "completed"
      },
      {
        id: "chat-002",
        userId: "user-2",
        userName: "Muhammad Ali",
        startTime: "2023-11-22T14:45:00",
        duration: "08:15",
        messageCount: 12,
        healthCondition: "Weight Loss",
        status: "completed"
      },
      {
        id: "chat-003",
        userId: "user-3",
        userName: "Fatima Zahra",
        startTime: "2023-11-22T16:20:00",
        duration: "03:10",
        messageCount: 4,
        healthCondition: "General",
        status: "abandoned"
      },
      {
        id: "chat-004",
        userId: "user-4",
        userName: "Ahmed Raza",
        startTime: "2023-11-22T18:05:00",
        duration: "00:00",
        messageCount: 2,
        healthCondition: "Heart Health",
        status: "in-progress"
      },
      {
        id: "chat-005",
        userId: "user-5",
        userName: "Saira Batool",
        startTime: "2023-11-21T11:15:00",
        duration: "15:45",
        messageCount: 22,
        healthCondition: "Hypertension",
        status: "completed"
      }
    ];
    
    setChatSessions(mockChatSessions);
  }, []);

  const filteredChatSessions = chatSessions.filter(session => {
    return session.userName.toLowerCase().includes(searchQuery.toLowerCase()) || 
           session.healthCondition.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleViewChat = (id: string) => {
    toast({
      title: "View Chat Session",
      description: `Viewing chat session with ID: ${id}`,
    });
  };

  const handleDownloadChat = (id: string) => {
    toast({
      title: "Download Chat Transcript",
      description: `Downloading transcript for chat session: ${id}`,
    });
  };

  const handleDeleteChat = (id: string) => {
    toast({
      title: "Delete Chat Session",
      description: `Are you sure you want to delete this chat session?`,
      variant: "destructive",
    });
  };

  function formatTime(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-PK", { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-PK", { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  }

  return (
    <ProtectedRoute requireAdmin>
      <AdminLayout title="AI Chat Sessions">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Chat Sessions</CardTitle>
            <CardDescription>Monitor AI chat interactions with users</CardDescription>
            <div className="pt-4">
              <Input
                placeholder="Search by user or health condition..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-1/2"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Messages</TableHead>
                    <TableHead>Health Focus</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredChatSessions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No chat sessions found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredChatSessions.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell className="font-medium">
                          {session.userName}
                        </TableCell>
                        <TableCell>
                          <div>{formatDate(session.startTime)}</div>
                          <div className="text-sm text-gray-500">{formatTime(session.startTime)}</div>
                        </TableCell>
                        <TableCell>{session.duration}</TableCell>
                        <TableCell>{session.messageCount}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                            {session.healthCondition}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              session.status === "completed"
                                ? "default"
                                : session.status === "in-progress"
                                ? "outline"
                                : "secondary"
                            }
                            className={
                              session.status === "completed"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : session.status === "in-progress"
                                ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                            }
                          >
                            {session.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewChat(session.id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownloadChat(session.id)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteChat(session.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminChats;
