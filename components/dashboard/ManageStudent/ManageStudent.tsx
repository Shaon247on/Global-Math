"use client";
import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Eye,
  Ban,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { dummyData, Student } from "@/data/studentData";
import OptionalModuleDialog from "../ModuleManagement/OptionalModuleDialog";

// Dummy data

type TimeFrame = "Monthly" | "Daily" | "Weekly" | "Yearly";
type FilterBy = "Attended Quiz" | "Total XP" | "Average Score";

const ITEMS_PER_PAGE = 10;

export default function ManageStudent() {
  const [students] = useState<Student[]>(dummyData);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("Monthly");
  const [filterBy, setFilterBy] = useState<FilterBy>("Total XP");
  const [studentToBlock, setStudentToBlock] = useState<Student | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Memoized filtered and sorted students
  const filteredStudents = useMemo(() => {
    let filtered = students;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (student) =>
          student.name.toLowerCase().includes(query) ||
          student.id.toLowerCase().includes(query)
      );
    }

    // Apply sorting based on filterBy
    filtered = [...filtered].sort((a, b) => {
      switch (filterBy) {
        case "Total XP":
          return b.xp - a.xp;
        case "Average Score":
          return parseInt(b.activeSubject) - parseInt(a.activeSubject);
        case "Attended Quiz":
          return a.rank - b.rank;
        default:
          return 0;
      }
    });

    return filtered;
  }, [students, searchQuery, filterBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
  useEffect(() => {
    if (currentPage !== 1) setCurrentPage(1);
  }, [searchQuery, filterBy]);

  const handleBlockStudent = (student: Student) => {
    setStudentToBlock(student);
  };

  const confirmBlock = () => {
    if (studentToBlock) {
      console.log("Blocking student:", studentToBlock);
      setStudentToBlock(null);
    }
  };

  const handleViewStudent = (student: Student) => {
    console.log("Viewing student:", student);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Pagination helpers
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(1, prev - 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  const goToPage = (page: number) => setCurrentPage(page);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="w-full">
      <div className="flex flex-col pt-4 lg:pt-0 bg-white lg:bg-transparent px-4 lg:px-0 pb-4 lg:pb-0 sm:flex-row gap-3 items-stretch justify-between sm:items-center">
        <div className="relative flex-1 bg-white max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search by name or ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Select
              value={filterBy}
              onValueChange={(value: FilterBy) => setFilterBy(value)}
            >
              <SelectTrigger className="w-[180px] bg-white">
                <SlidersHorizontal className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Attended Quiz">Attended Quiz</SelectItem>
                <SelectItem value="Total XP">Total XP</SelectItem>
                <SelectItem value="Average Score">Average Score</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Select
            value={timeFrame}
            onValueChange={(value) => setTimeFrame(value as TimeFrame)}
          >
            <SelectTrigger className="w-full bg-white sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Monthly">Monthly</SelectItem>
              <SelectItem value="Daily">Daily</SelectItem>
              <SelectItem value="Weekly">Weekly</SelectItem>
              <SelectItem value="Yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Card className="w-full shadow-lg rounded-none lg:mt-4">
        <CardContent className="p-0">
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Rank</TableHead>
                  <TableHead className="font-semibold">Profile</TableHead>
                  <TableHead className="font-semibold md:pl-8">Name</TableHead>
                  <TableHead className="font-semibold">Quiz Attempts</TableHead>
                  <TableHead className="font-semibold">XP</TableHead>
                  <TableHead className="font-semibold pl-10 xl:w-52">
                    Active Subject
                  </TableHead>
                  <TableHead className="font-semibold">View</TableHead>
                  <TableHead className="font-semibold">Block</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentStudents.map((student, index) => (
                  <TableRow
                    key={`${student.id}-${index}`}
                    className="hover:bg-gray-50"
                  >
                    <TableCell>{student.rank}</TableCell>
                    <TableCell>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback>
                          {getInitials(student.name)}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {student.name}
                    </TableCell>
                    <TableCell className="md:pl-10 font-medium">
                      {student.attempted}
                    </TableCell>
                    <TableCell>{student.xp}</TableCell>
                    <TableCell className="md:pl-20">
                      {student.activeSubject}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/dashboard/student-management/${student.id}`}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewStudent(student)}
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        >
                          <Eye className="h-5 w-5" />
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleBlockStudent(student)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Ban className="h-5 w-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="md:hidden space-y-3 p-4">
            {currentStudents.map((student, index) => (
              <Card key={`${student.id}-${index}`} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="shrink-0">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={student.avatar} alt={student.name} />
                      <AvatarFallback>
                        {getInitials(student.name)}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-base truncate">
                        {student.name}
                      </h3>
                      <span className="text-sm text-gray-500 ml-2">
                        #{student.rank}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 font-mono mb-2">
                      {student.attempted}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span>XP: {student.xp}</span>
                      <span>Subject: {student.activeSubject}</span>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/dashboard/student-management/${student.id}`}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewStudent(student)}
                          className="flex-1 text-green-600 border-green-600 hover:bg-green-50"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleBlockStudent(student)}
                        className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
                      >
                        <Ban className="h-4 w-4 mr-1" />
                        Block
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p>No students found matching your criteria.</p>
            </div>
          )}

          {/* Pagination */}
          {filteredStudents.length > 0 && (
            <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-0 items-center justify-between px-4 py-4 border-t">
              <div className="text-sm text-gray-500">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, filteredStudents.length)} of{" "}
                {filteredStudents.length} students
              </div>

              <nav className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToFirstPage}
                  disabled={currentPage === 1}
                  className="h-8 w-8"
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex items-center gap-1">
                  {getPageNumbers().map((page, idx) =>
                    page === "..." ? (
                      <span
                        key={`ellipsis-${idx}`}
                        className="px-2 text-gray-400"
                      >
                        ...
                      </span>
                    ) : (
                      <Button
                        key={`page-${page}`}
                        variant="outline"
                        size="sm"
                        onClick={() => goToPage(page as number)}
                        className={`h-8 min-w-8 px-3 ${
                          currentPage === page
                            ? "bg-[#52B1FF] text-white hover:bg-[#52B1FF]/90 border-[#52B1FF]"
                            : ""
                        }`}
                      >
                        {page}
                      </Button>
                    )
                  )}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToLastPage}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8"
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </nav>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog
        open={!!studentToBlock}
        onOpenChange={() => setStudentToBlock(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure to Block the student?
            </AlertDialogTitle>
            <AlertDialogDescription className="sr-only">
              This action will block {studentToBlock?.name} from accessing the
              platform.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row gap-3 sm:gap-2">
            <AlertDialogCancel className="bg-green-600 text-white hover:bg-green-700 mt-0 flex-1 sm:flex-none">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmBlock}
              className="bg-red-600 text-white hover:bg-red-700 flex-1 sm:flex-none"
            >
              Block
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
