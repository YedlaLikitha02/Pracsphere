// File: apps/web/app/api/tasks/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

// GET: Fetch all tasks for the logged-in user
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db("pracsphere");
  const tasks = await db.collection("tasks").find({ userEmail: session.user.email }).toArray();

  return NextResponse.json(tasks);
}

// POST: Create a new task
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Check if request is FormData or JSON
  const contentType = request.headers.get("content-type");
  let title, description, dueDate, images = [];

  if (contentType?.includes("multipart/form-data")) {
    // Handle FormData (with images)
    const formData = await request.formData();
    title = formData.get("title") as string;
    description = formData.get("description") as string;
    dueDate = formData.get("dueDate") as string;

    // Process images
    const imageFiles = formData.getAll("images");
    for (const file of imageFiles) {
      if (file instanceof File) {
        // Convert file to base64 for simple storage
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = buffer.toString('base64');
        const imageUrl = `data:${file.type};base64,${base64}`;
        images.push(imageUrl);
      }
    }
  } else {
    // Handle JSON (backward compatibility)
    const body = await request.json();
    title = body.title;
    description = body.description;
    dueDate = body.dueDate;
  }

  if (!title || !description || !dueDate) {
    return new NextResponse("Missing fields", { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("pracsphere");
  
  const taskData: any = {
    title,
    description,
    dueDate,
    status: "pending",
    userEmail: session.user.email,
  };

  // Only add images field if there are images
  if (images.length > 0) {
    taskData.images = images;
  }

  const result = await db.collection("tasks").insertOne(taskData);

  return NextResponse.json(result, { status: 201 });
}

// PATCH: Update a task's status
export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id, status } = await request.json();
  if (!id || !status) {
    return new NextResponse("Missing task ID or status", { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("pracsphere");
  await db.collection("tasks").updateOne(
    { _id: new ObjectId(id), userEmail: session.user.email },
    { $set: { status } }
  );

  return NextResponse.json({ message: "Task updated" });
}

// DELETE: Delete a task
export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await request.json();
  if (!id) {
    return new NextResponse("Missing task ID", { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("pracsphere");
  await db.collection("tasks").deleteOne({ 
    _id: new ObjectId(id), 
    userEmail: session.user.email
  });

  return NextResponse.json({ message: "Task deleted" });
}