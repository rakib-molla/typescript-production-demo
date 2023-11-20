import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student/student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: { 
    type: String,
    required: [true, 'First name is required'] ,
    maxlength: [ 20, ' first name can not be more than allowed length is 20'],
    trim: true,
    validate:{
      validator: function(value: string){
        const firstNameStr = value.charAt(0).toUpperCase()+value.slice(1);
        return firstNameStr === value;
      },
      message: "{VALUE} is not a capitalize format"
    }
},
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required']
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: [true, 'father name is required'] },
  fatherOccupation: { type: String, required: [true, 'father occupation is required'] },
  fatherContactNo: { type: String, required: [true, 'father contact no is required'] },
  motherName: { type: String, required: [true, 'mother name is required'] },
  motherContactNo: { type: String, required: [true, 'mother contact no is required'] },
  motherOccupation: { type: String, required: [true, 'mother occupation  is required'] },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String },
  occupation: { type: String },
  contactNo: { type: String },
  address: { type: String },
});

const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: "{VALUE} is not valid"
    },
    required: [true, 'gender is required'],
  },
  dateOfBirth: { type: String },
  email: { type: String, required: [true, 'email is required'], unique: true },
  contactNo: { type: String, required: [true, 'contact no is required'] },
  emergencyNo: { type: String, required: [true, 'emergency field required'] },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
      message: "the field can only be one of the following: 'abc'"
    },
  },
  presentAddress: { type: String, required: [true, 'field is required'] },
  permanentAddress: { type: String, required: [true, 'field is required'] },
  guardian: {
    type: guardianSchema,
    required: [true, 'field is required']
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'field is required']
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

export const StudentModel = model<Student>('Student', studentSchema);
