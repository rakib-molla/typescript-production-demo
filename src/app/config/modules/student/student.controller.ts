import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';



const createStudent = async (req: Request, res: Response) => {
  try {

    // creating a schema validation using joi
    
    const { student: studentData } = req.body;
    const {error, value} = studentValidationSchema.validate(studentData)

    console.log(error);
    console.log(value);

    // will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(studentData);

    
    if(error){
      res.status(500).json({
        success: false,
        message: 'something wrong',
        error: error.details,
      })
    }

    
    // send response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: error,
    });
  }
};

const getallStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getallStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'student is retrieved successfully ',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentControllers = {
  createStudent,
  getallStudent,
  getSingleStudent,
};
